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
        $examData = DB::table('grades as g')
            ->select('u.name as student_name', 'g.score as exam_score')
            ->join('exam as e', 'e.exam_id', '=', 'g.exam_id')
            ->join('user as u', 'u.userid', '=', 'g.student_id')
            ->where('g.exam_id', $exam_id)
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
    ob_start(); // Start output buffering

    $output = fopen('php://output', 'w');
    foreach ($data as $row) {
        fputcsv($output, $row);
    }
    fclose($output);

    // Capture the CSV content in a variable and return it
    $csvContent = ob_get_clean();
    return $csvContent;
}

    public function downloadStudentGrades($userid, $courseId)
    {
        $studentData = DB::table('grades AS g')
        ->join('exam AS e', 'e.exam_id', '=', 'g.exam_id')
        ->join('user AS u', 'u.userid', '=', 'g.student_id')
        ->select(
            'u.name AS student_name',
            'e.exam_title AS exam_name',
            'g.score AS exam_marks',
            'e.score AS total_marks'
        )
        ->where('u.userid', $userid)
        ->where('g.course_id', $courseId)
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

    public function saveScore(Request $request)
    {
        $data = $request->json()->all();

        if (isset($data['studentId'], $data['examId'], $data['courseId'], $data['score'])) {
            $studentId = $data['studentId'];
            $examId = $data['examId'];
            $courseId = $data['courseId'];
            $score = $data['score'];

            // Perform the insert operation
            try {
                // Assuming you have a 'grades' table in your database
                DB::table('grades')->insert([
                    'exam_id' => $examId,
                    'course_id' => $courseId,
                    'student_id' => $studentId,
                    'date' => now(),
                    'score' => $score,
                ]);

                $response = ["success" => "Score saved successfully"];
            } catch (\Exception $e) {
                $response = ["error" => "Failed to save score"];
            }
        } else {
            $response = ["error" => "Invalid data received"];
        }

        return response()->json($response);
    }
}
