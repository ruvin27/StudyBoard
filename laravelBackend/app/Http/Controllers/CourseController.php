<?php

namespace App\Http\Controllers;
use App\Utils\CourseFormatter;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    protected $formatter;

    public function __construct()
    {
        $this->formatter = new CourseFormatter();
    }

    public function getAllCourses()
    {
        $courses = Course::select([
            'course.course_id as course_id',
            'course.name as course_name',
            'course.description as course_description',
            'course.start_date as course_start_date',
            'course.end_date as course_end_date',
            'course.code as course_code',
            'u.userid as instructor_id',
            'u.email as instructor_email',
            'u.name as instructor_name',
            'course.objective as course_objective',
            'p.program_id as program_id',
            'p.program_name as program_name',
            'p.description as program_description',
            's.userid as student_id',
            's.email as student_email',
            's.name as student_name'
        ])
        ->join('user as u', 'course.instructor_id', '=', 'u.userid')
        ->join('program as p', 'course.program_id', '=', 'p.program_id')
        ->leftJoin('enrollment as sec', 'course.course_id', '=', 'sec.course_id')
        ->leftJoin('user as s', 'sec.student_id', '=', 's.userid')
        ->get();

        $coursesArray = $courses->toArray();

        return response()->json(['code' => 200, 'status' => 'success', 'data' => $this->formatter->formatInstructorResponse($coursesArray), 'message' => null]);
    }

    public function listAllByInstructorId($instructorId)
    {
        $courses = Course::select([
            'course.course_id as course_id',
            'course.name as course_name',
            'course.description as course_description',
            'course.start_date as course_start_date',
            'course.end_date as course_end_date',
            'course.code as course_code',
            'u.userid as instructor_id',
            'u.email as instructor_email',
            'u.name as instructor_name',
            'course.objective as course_objective',
            'p.program_id as program_id',
            'p.program_name as program_name',
            'p.description as program_description',
            's.userid as student_id',
            's.email as student_email',
            's.name as student_name'
        ])
        ->join('user as u', 'course.instructor_id', '=', 'u.userid')
        ->join('program as p', 'course.program_id', '=', 'p.program_id')
        ->leftJoin('enrollment as sec', 'course.course_id', '=', 'sec.course_id')
        ->leftJoin('user as s', 'sec.student_id', '=', 's.userid')
        ->where('course.instructor_id', $instructorId)
        ->get();

        $coursesArray = $courses->toArray();

        return response()->json(['code' => 200, 'status' => 'success', 'data' => $this->formatter->formatInstructorResponse($coursesArray), 'message' => null]);
    }

    public function getById($courseId)
    {
        $course = Course::select([
            'course.course_id as course_id',
            'course.name as course_name',
            'course.description as course_description',
            'course.start_date as course_start_date',
            'course.end_date as course_end_date',
            'course.code as course_code',
            'u.userid as instructor_id',
            'u.email as instructor_email',
            'u.name as instructor_name',
            'course.objective as course_objective',
            'p.program_id as program_id',
            'p.program_name as program_name',
            'p.description as program_description',
            's.userid as student_id',
            's.email as student_email',
            's.name as student_name'
        ])
        ->join('user as u', 'course.instructor_id', '=', 'u.userid')
        ->join('program as p', 'course.program_id', '=', 'p.program_id')
        ->leftJoin('enrollment as sec', 'course.course_id', '=', 'sec.course_id')
        ->leftJoin('user as s', 'sec.student_id', '=', 's.userid')
        ->where('course.course_id', $courseId)
        ->first();

        return response()->json(['code' => 200, 'status' => 'success', 'data' => $this->formatter->formatCourseResponse($course), 'message' => null]);
    }

    public function removeCourse($courseId)
    {
        $course = Course::find($courseId);

        if (!$course) {
            return response()->json(['code' => 400, 'status' => 'error', 'data' => null, 'message' => 'Failed to remove course']);
        }

        // Delete the course
        $course->delete();

        return response()->json(['code' => 200, 'status' => 'success', 'data' => true, 'message' => 'Course removed successfully']);
    }

    public function create(Request $request)
    {
        $course = new Course;
        $course->name = $request->input('name');
        $course->description = $request->input('description');
        $course->instructor_id = $request->input('instructor_id');
        $course->program_id = $request->input('program_id');
        $course->start_date = $request->input('start_date');
        $course->end_date = $request->input('end_date');
        $course->code = $request->input('code');
        $course->objective = $request->input('objective');

        if ($course->save()) {
            return response()->json(['code' => 200, 'status' => 'success', 'data' => true, 'message' => 'Course created successfully']);
        } else {
            return response()->json(['code' => 400, 'status' => 'error', 'data' => null, 'message' => 'Failed to create course']);
        }
    }

    public function updateCourse(Request $request)
    {

        $courseData = [
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'start_date' => $request->input('start_date'),
            'end_date' => $request->input('end_date'),
            'code' => $request->input('code'),
            'objective' => $request->input('objective'),
        ];

        $courseId = $request->input('course_id');
        $course = Course::find($courseId);

        if ($course) {
            $course->update($courseData);
            return response()->json(['code' => 200, 'status' => 'success', 'data' => true, 'message' => 'Course updated successfully']);
        } else {
            return response()->json(['code' => 400, 'status' => 'error', 'data' => null, 'message' => 'Failed to update course']);
        }
    }
    public function getUserCourses( $userid)
    {


            $courses = Course::select('course.name', 'course.description', 'course.instructor_id', 'course.course_id', 'user.name as instructor_name')
                ->join('enrollment as sec', 'course.course_id', '=', 'sec.course_id')
                ->join('user', 'course.instructor_id', '=', 'user.userid')
                ->where('sec.student_id', $userid)
                ->get();

            return response()->json($courses);
        
    }

    
}
