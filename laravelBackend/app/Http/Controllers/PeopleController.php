<?php
namespace App\Http\Controllers;

use App\Models\Enrollment;
use App\Models\User;
use App\Models\Course;
use Illuminate\Http\Request;

class PeopleController extends Controller
{
    public function getPeopleDetails($courseId)
    {
       
            $courseId = $courseId;

            // Query to get student details
            $students = Enrollment::select('user.name', 'enrollment.student_id', 'enrollment.course_id', 'user.role')
                ->join('user', 'enrollment.student_id', '=', 'user.userid')
                ->where('enrollment.course_id', $courseId)
                ->get();

            // Query to get instructor details
            $instructor = Course::select('user.name as instructorName', 'course.name as courseName', 'course.instructor_id')
                ->join('user', 'course.instructor_id', '=', 'user.userid')
                ->where('course.course_id', $courseId)
                ->first();

            $peopleDetails = $students->toArray();

            // Append the instructor's details to the peopleDetails array
            if ($instructor) {
                $peopleDetails[] = array(
                    "name" => $instructor['instructorName'],
                    "instructor_id" => $instructor['instructor_id'],
                    "courseName" => $instructor['courseName'],
                    "role" => "Instructor",
                );
            }

            return response()->json($peopleDetails);
        
    }
}
