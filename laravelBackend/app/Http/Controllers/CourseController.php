<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;

class CourseController extends Controller
{
    public function getAllCourses()
    {
        $courses = Course::all();

        return response()->json($courses);
    }
}
