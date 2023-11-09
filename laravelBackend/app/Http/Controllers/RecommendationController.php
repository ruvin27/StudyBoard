<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Recommendation;

class RecommendationController extends Controller
{
    public function getAllByCourseId(Request $request, $courseId)
    {

        $recommendations = Recommendation::with(['course', 'sender'])
            ->where('course_id', $courseId)
            ->get();

        return response()->json(['code' => 200, 'status' => 'success', 'data' => $recommendations, 'message' => null]);
    }

    public function storeRecommendation(Request $request){
        $course_id = $request->input('course_id');
        $message = $request->input('message');
        $sender_id = $request->input('sender_id');

        $recommendation = Recommendation::create([
            'course_id' => $course_id,
            'message' => $message,
            "sender_id" => $sender_id
        ]);

        if($recommendation){
            return response()->json(['code' => 200, 'status' => 'success', 'data' => null, 'message' => 'Response sent']);
        }else{
            return response()->json(['code' => 400, 'status' => 'error', 'data' => null, 'message' => 'Response could not be stored']);

        }
    }

}
