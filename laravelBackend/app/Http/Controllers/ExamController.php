<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Exam;
use App\Models\Course;
use App\Utils\ExamFormatter;

class ExamController extends Controller
{
    protected $formatter;

    public function __construct()
    {
        $this->formatter = new ExamFormatter();
    }

    public function create(Request $request)
    {
        $exam = new Exam;
        $exam->exam_title = $request->input('exam_title');
        $exam->date = $request->input('exam_date');
        $exam->description = $request->input('exam_description');
        $exam->score = $request->input('exam_score');
        $exam->course_id = $request->input('course_id');
        $exam->exam_duration = $request->input('exam_duration');

        if ($exam->save()) {
            return response()->json(['code' => 200, 'status' => 'success', 'data' => $exam, 'message' => 'Exam created successfully']);
        } else {
            return response()->json(['code' => 400, 'status' => 'error', 'data' => null, 'message' => 'Failed to create exam']);
        }
    }

    public function update(Request $request)
    {

        $examData = [
            'exam_title' => $request->input('exam_title'),
            'date' => $request->input('exam_date'),
            'description' => $request->input('exam_description'),
            'score' => $request->input('exam_score'),
            'exam_duration' => $request->input('exam_duration'),
        ];

        $examId = $request->input('exam_id');
        $exam = Exam::find($examId);

        if ($exam) {
            $exam->update($examData);
            return response()->json(['code' => 200, 'status' => 'success', 'data' => true, 'message' => 'Exam updated successfully']);
        } else {
            return response()->json(['code' => 400, 'status' => 'error', 'data' => null, 'message' => 'Failed to update exam']);
        }
    }

    public function getById(Request $request, $examId)
    {
        $exam = Exam::getExamWithAlias($examId);

        if (!$exam) {
            return response()->json(['code' => 404, 'status' => 'error', 'data' => null, 'message' => 'Exam not Found']);
        }

        return response()->json(['code' => 200, 'status' => 'success', 'data' => $exam, 'message' => null]);
    }

    public function getAllByCourseId($courseId)
    {
        $exams = Course::select([
            'course.course_id as course_id',
            'course.name as course_name',
            'course.description as course_description',
            'e.exam_id as exam_id',
            'e.exam_title as exam_title',
            'e.description as exam_description',
            'e.exam_duration as exam_duration',
            'e.date as exam_date',
            'g.student_id as student_id',
            'u.email as student_email',
            'u.name as student_name',
            'g.score as grade_score'
        ])
        ->leftJoin('exam  as e', 'course.course_id', '=', 'e.course_id')
        ->leftJoin('grades as g', 'e.exam_id', '=', 'g.exam_id')
        ->leftJoin('user as u', 'g.student_id', '=', 'u.userid')
        ->where('course.course_id', $courseId)
        ->get();

        $examsArray = $exams->toArray();
        return response()->json(['code' => 200, 'status' => 'success', 'data' => $this->formatter->formatAllExamsResponse($examsArray), 'message' => 'Exams fetched successfully']);
    }

    public function getExamDetailsByStudentId($courseId, $userId)
    {
        $examDetails = Exam::select('exam.exam_id', 'exam.course_id', 'g.score', 'exam.exam_title', 'exam.score as total')
            ->leftJoin('grades as g', function ($join) use ($userId) {
                $join->on('exam.exam_id', '=', 'g.exam_id')
                    ->where('g.student_id', '=', $userId);
            })
            ->where('exam.course_id', $courseId)
            ->get();

        return response()->json($examDetails);
    }


}
