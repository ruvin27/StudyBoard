<?php

namespace App\Http\Controllers;

use App\Models\UserActivity;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserActivityController extends Controller
{
    public function getActivity()
    {
        $userActivities = UserActivity::all();

        return response()->json($userActivities);
    }
}
