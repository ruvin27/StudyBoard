<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Enrollment;
use App\Models\UserModel;

class EnrollmentController extends Controller
{
    
    public function getEnrollmentData()
    {
        $enrollments = Enrollment::with('user', 'course')->get();

        $formattedEnrollments = $enrollments->map(function ($enrollment) {
            return [
                'email' => $enrollment->user->email,
                'userid' => $enrollment->user->userid,
                'Role' => $enrollment->user->role,
                'courseName' => $enrollment->course->name,
                'course_id' => $enrollment->course->course_id,
            ];
        });
    
        return response()->json($formattedEnrollments);
    }

    public function deleteEnrollment(Request $request, $userid, $courseid)
    {
        // Find the enrollment record to delete
        $enrollment = Enrollment::where('student_id', $userid)->where('course_id', $courseid)->first();
        
        if ($enrollment) {
            // Delete the enrollment record
            $enrollment->delete();
            return response()->json(['message' => 'Record deleted successfully']);
        } else {
            return response()->json(['error' => 'Record not found'], 404);
        }
    }

    public function addEnrollment(Request $request)
    {
        $email = $request->input('email');
        $course_id = $request->input('course_id');

        // Find the user by email
        $user = UserModel::where('email', $email)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Check if the user is already enrolled in the course
        $enrollment = Enrollment::where('student_id', $user->userid)
            ->where('course_id', $course_id)
            ->first();

        if ($enrollment) {
            return response()->json(['message' => 'User has Access']);
        }

        // Create a new enrollment record
        $enrollment = new Enrollment();
        $enrollment->student_id = $user->userid;
        $enrollment->course_id = $course_id;
        $enrollment->save();

        return response()->json(['message' => 'Data inserted successfully']);
    }
}
