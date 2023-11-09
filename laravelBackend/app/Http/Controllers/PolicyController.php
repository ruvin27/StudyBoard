<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Policy;

class PolicyController extends Controller
{
    public function listAll()
    {
        $policies = Policy::first();

        return response()->json(['data' => $policies], 200);
    }

    public function updatePolicy(Request $request)
    {
        $policy = $request->input('policies');
        $policies = Policy::find(1);
        $policies->policies = $policy;
        $policies->save();

        return response('QA Policies updated successfully');
    }
}
