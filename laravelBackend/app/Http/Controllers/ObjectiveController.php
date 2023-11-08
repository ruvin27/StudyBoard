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
}
