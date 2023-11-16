<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserModel;
use App\Models\Exam;
use App\Grade;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class GradeController extends Controller
{
    public function getStudentsByCourseId($courseId)
    {
        $students = UserModel::select('user.name', 'user.userid')
            ->join('grades', 'user.userid', '=', 'grades.student_id')
            ->where('grades.course_id', $courseId)
            ->get();

        return response()->json($students);
    }

    public function getGraphData($exam_id)
    {
        $examData = DB::table('exam as e')
            ->select('u.name as student_name', 'g.score as exam_score')
            ->join('grades as g', 'e.exam_id', '=', 'g.exam_id')
            ->join('enrollment as en', 'en.student_id', '=', 'g.student_id')
            ->join('user as u', 'u.userid', '=', 'en.student_id')
            ->where('e.exam_id', $exam_id)
            ->get();

            $data = [];
            $data[] = ['Student Name', 'Exam Score'];

            foreach ($examData as $row) {
                $data[] = [$row->student_name, (float)$row->exam_score];
            }
        return response()->json($data);
    }

    public function downloadExamData($exam_id, $courseId)
    {
        $studentData = DB::table('exam as e')
            ->select('u.name as student_name', 'e.exam_title as exam_name', 'g.score as exam_marks', 'e.score as total_marks')
            ->join('grades as g', 'e.exam_id', '=', 'g.exam_id')
            ->join('enrollment as en', 'en.student_id', '=', 'g.student_id')
            ->join('user as u', 'u.userid', '=', 'en.student_id')
            ->where('e.exam_id', $exam_id)
            ->where('g.course_id', $courseId)
            ->orderBy('e.exam_title')
            ->get();

        $classData = DB::table('exam as e')
            ->select('e.exam_title as exam_name', DB::raw('AVG(g.score) as class_average'), 'e.score as total', DB::raw('(SUM(g.score) / SUM(e.score)) * 100 as class_marks_percentage'))
            ->join('grades as g', 'e.exam_id', '=', 'g.exam_id')
            ->where('e.exam_id', $exam_id)
            ->where('g.course_id', $courseId)
            ->groupBy('e.exam_title', 'total')
            ->get();

        if ($studentData->isNotEmpty() && $classData->isNotEmpty()) {
            $data = [];
            $data[] = ['student_name', 'exam_name', 'exam_marks', 'total_marks'];

            foreach ($studentData as $row) {
                $data[] = (array)$row;
            }

            $data[] = [''];
            $data[] = ['exam_name', 'class_average', 'total', 'class_marks_percentage'];

            foreach ($classData as $row) {
                $data[] = (array)$row;
            }

            $csvFileName = 'exam_data.csv';
            $response = new Response($this->arrayToCsv($data));
            $response->header('Content-Type', 'text/csv');
            $response->header('Content-Disposition', "attachment; filename=\"$csvFileName\"");

            return $response;
        }

        return response()->json([], 404);
    }

    private function arrayToCsv(array $data)
    {
        $output = fopen('php://output', 'w');
        foreach ($data as $row) {
            fputcsv($output, $row);
        }
        fclose($output);
    }

    public function downloadStudentGrades($userid, $courseId)
    {
        $studentData = DB::table('exam AS e')
            ->join('grades AS g', 'e.exam_id', '=', 'g.exam_id')
            ->join('enrollment AS en', 'en.student_id', '=', 'g.student_id')
            ->join('user AS u', 'u.userid', '=', 'en.student_id')
            ->select(
                'u.name AS student_name',
                'e.exam_title AS exam_name',
                'g.score AS exam_marks',
                'e.score AS total_marks'
            )
            ->where('u.userid', $userid)
            ->orderBy('u.name')
            ->get();

        if ($studentData->isNotEmpty()) {
            $data = [];
            $data[] = ['student_name', 'exam_name', 'exam_marks', 'total_marks'];

            foreach ($studentData as $row) {
                $data[] = (array)$row;
            }
            $csvFileName = 'student_data.csv';
            $response = new Response($this->arrayToCsv($data));
            $response->header('Content-Type', 'text/csv');
            $response->header('Content-Disposition', "attachment; filename=\"$csvFileName\"");

            return $response;
        }

        return response()->json(['message' => 'No data found'], 404);
    }

    
}
