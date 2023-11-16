<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Exam;

class QuestionController extends Controller
{
    public function replaceQuestions(Request $request)
    {
        $data = $request->json()->all();

        $examId = $data['exam_id'];
        $questionsData = $data['questions'];

        // Delete existing questions for the exam
        Question::where('exam_id', $examId)->delete();

        foreach ($questionsData as $questionData) {
            $question = new Question($questionData);
            $question->exam_id = $examId;
            $question->save();
        }
        $totalQuestions = count($questionsData);
        Exam::where('exam_id', $examId)->update(['score' => $totalQuestions]);

        return response()->json(['code' => 200, 'status' => 'success', 'data' => null, 'message' => 'Questions replaced successfully']);
    }
}
