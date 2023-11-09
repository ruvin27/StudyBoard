<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Objective;

class ObjectiveController extends Controller
{
    public function listAll()
    {
        $objectives = Objective::where('program_id', 1)->get();

        return response()->json(['data' => $objectives], 200);
    }

    public function updateObjective(Request $request)
    {
        $objective = $request->input('objective');
        $objective_id = $request->input('objective_id');

        $result = Objective::where('objective_id', $objective_id)->first();
    
        if (!$result) {
            return response()->json(['code' => 404, 'status' => 'error', 'data' => null, 'message' => 'Objective not found']);
        }

        $result->update(['objective' => $objective]);

        return response()->json(['message' => "Objective Updated"], 200);
    }
    
}
