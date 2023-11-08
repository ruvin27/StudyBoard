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

    public function getUnapprovedUsers()
    {
        $users = UserModel::where('approved', 0)->get(['email', 'userid', 'role']);
        return response()->json($users);
    }

    public function approveUser(Request $request)
    {
        $id = $request->input('id');
        $user = UserModel::find($id);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

        $user->update(['approved' => 1]);

        return response()->json(['message' => 'User Approved']);
    }

    public function getAllUsers()
    {
        $users = UserModel::all();

        return response()->json($users);
    }

    public function getUserById(Request $request, $userid)
    {        
        $user = UserModel::find($userid);

        if ($user) {
            return response()->json($user);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
        
    }


    public function updateUser(Request $request)
    {
        $email = $request->input('email');
        $name = $request->input('name');
        $phone = $request->input('phone');
        $user = UserModel::where('email', $email)->first();

        if ($user) {
            $user->name = $name;
            $user->phone_number = $phone;
            $user->save();
            return response()->json(['message' => 'Profile Updated']);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }
        
    }
}
