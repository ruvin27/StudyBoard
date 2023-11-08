<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserModel;

class UserController extends Controller
{
    public function getStudentEmails()
    {
        $emails = UserModel::where('role', 'Student')->pluck('email')->toArray();

        return response()->json($emails);
    }
}
