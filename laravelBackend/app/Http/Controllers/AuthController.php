<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\UserModel;
use App\Http\Controllers\UserActivityController;
use App\Mail\EmailVerification;
use App\Mail\PasswordResetMail;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $email = $request->input('email');
        $password = $request->input('password');

        $user = UserModel::where('email', $email)->first();

        if (!$user) {
            return response()->json(['code' => 404, 'status' => 'error', 'data' => null, 'message' => 'User not Found']);
        }

        if (password_verify($password, $user->password)) {
            $userActivity = new UserActivityController;
            $userActivity->logActivity($email, $user->role);
            return response()->json(['code' => 200, 'status' => 'success', 'data' => $user, 'message' => null]);
        } else {
            return response()->json(['code' => 400, 'status' => 'error', 'data' => null, 'message' => 'Invalid credentials']);
        }
    }

    public function register(Request $request)
    {
        $email = $request->input('email');
        $existingUser = UserModel::where('email', $email)->first();

        if ($existingUser) {
            return response()->json(['code' => 400, 'status' => 'error', 'data' => null, 'message' => 'Email already registered']);
        }
        $user = new UserModel([
            'email' => $request->input('email'),
            'password' => $request->input('password'),
            'name' => $request->input('name'),
            'phone_number' => $request->input('phone_number'),
            'role' => $request->input('role')
        ]);
        $user->generateVerificationCode();
        
        Mail::to($user->email)->send(new EmailVerification($user->verification_code, $user->email, $user->name));
        $user->save();


        return response()->json(['code' => 200, 'status' => 'success', 'data' => null, 'message' => 'User registered successfully']);
    }

    public function verifyOTP(Request $request)
    {
        $email = $request->input('email');
        $otp = $request->input('otp');
    
        $user = UserModel::where('email', $email)->where('verification_code', $otp)->first();
    
        if (!$user) {
            return response()->json(['code' => 404, 'status' => 'error', 'data' => null, 'message' => 'Invalid OTP']);
        }
    
        $user->email_verified_at = now();

        $user->save();
    
        return response()->json(['code' => 200, 'status' => 'success', 'data' => $user, 'message' => 'OTP verified successfully']);

        
    }

    public function forgotPassword(Request $request)
    {
        $email = $request->input('email');
    
        $user = UserModel::where('email', $email)->first();
    
        if (!$user) {
            return response()->json(['code' => 404, 'status' => 'error', 'data' => null, 'message' => 'User not found']);
        }
        Mail::to($user->email)->send(new PasswordResetMail($user->verification_code, $user->email, $user->name));
    
        return response()->json(['code' => 200, 'status' => 'success', 'data' => $user, 'message' => 'Email with Reset Link sent successfully']);

        
    }

    public function newPassword(Request $request)
    {
        $email = $request->input('email');
        $code = $request->input('code');
        $password = $request->input('password');
        $user = UserModel::where('email', $email)->first();
    
        if (!$user) {
            return response()->json(['code' => 404, 'status' => 'error', 'data' => null, 'message' => 'User not found']);
        }

        $user->update(['password' => $password]);
        return response()->json(['code' => 200, 'status' => 'success', 'data' => $user, 'message' => 'Password changed successfully']);

        
    }
    
}
