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
}
