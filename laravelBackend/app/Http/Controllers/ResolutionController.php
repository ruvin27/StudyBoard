<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Exam;
use App\Models\Course;
use App\Models\Grade;
use App\Models\ExamResolution;

class ResolutionController extends Controller
{
    public function getBelowAvgExams()
    {
        // Retrieve exams with an average below 70
        $belowAverageExams = DB::table('exam')
            ->join('grades', 'exam.exam_id', '=', 'grades.exam_id')
            ->join('course', 'exam.course_id', '=', 'course.course_id')
            ->select(
                'course.name as course_name',
                'exam.exam_title as exam_name',
                DB::raw('AVG(grades.score) as class_avg'),
                'exam.score as total',
                'exam.exam_id',
                'exam.course_id'
            )
            ->groupBy('exam.exam_id', 'course.name', 'exam.exam_title', 'exam.score', 'exam.course_id')
            ->havingRaw('AVG(grades.score) / exam.score < 0.7')
            ->get();

        foreach ($belowAverageExams as $exam) {
            $examId = $exam->exam_id;
            $total = $exam->total;
            $avgScore = $exam->class_avg;

            // Check if the exam_resolution entry exists
            $examResolution = ExamResolution::where('exam_id', $examId)->first();

            if (!$examResolution) {
                // If not present, create a new exam_resolution entry
                ExamResolution::create([
                    'exam_id' => $examId,
                    'qa_officer_resolved' => 0,
                    'program_coordinator_resolved' => 0,
                    'avg_score' => $avgScore,
                    'total' => $total,
                ]);
            } else {
                // Update the existing exam_resolution entry
                $examResolution->total = $total;
                $examResolution->avg_score = $avgScore;
                $examResolution->save();
            }
        }

        // Fetch the resolved exams
        $responses = DB::table('exam_resolution')
            ->join('exam', 'exam_resolution.exam_id', '=', 'exam.exam_id')
            ->join('course', 'exam.course_id', '=', 'course.course_id')
            ->select(
                'exam.exam_id',
                'exam.exam_title',
                'qa_officer_resolved',
                'program_coordinator_resolved',
                'course.name',
                'exam_resolution.total',
                'exam_resolution.avg_score'
            )
            ->get();

        return response()->json($responses);
    }

    public function updateResolution(Request $request)
    {
        $data = $request->json()->all();
        $examId = $data['examId'];
        $resolvedBy = $data['resolvedBy'];

        $examResolution = ExamResolution::where('exam_id', $examId)->first();

        if (!$examResolution) {
            return response()->json(['success' => false, 'message' => 'Exam resolution not found']);
        }

        if ($resolvedBy === 'QA Officer') {
            $examResolution->qa_officer_resolved = 1;
        } elseif ($resolvedBy === 'Program Coordinator') {
            $examResolution->program_coordinator_resolved = 1;
        } else {
            return response()->json(['success' => false, 'message' => 'Invalid resolution type']);
        }

        $examResolution->save();

        return response()->json(['success' => true, 'message' => '']);
    }
}
