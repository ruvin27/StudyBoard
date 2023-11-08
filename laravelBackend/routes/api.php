<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ColorController;
use App\Http\Controllers\UserActivityController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ObjectiveController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\RecommendationController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('getcolors', [ColorController::class, 'getColorTable']);
Route::post('updatecolor', [ColorController::class, 'updateColor']);


Route::get('getuseractivity', [UserActivityController::class, 'getActivity']);
Route::get('enrollment-data', [EnrollmentController::class, 'getEnrollmentData']);
Route::delete('enrollments/{userid}/{courseid}', [EnrollmentController::class, 'deleteEnrollment']);
Route::get('get-student-emails', [UserController::class, 'getStudentEmails']);
Route::post('add-enrollment', [EnrollmentController::class, 'addEnrollment']);
Route::get('unapproved-users', [UserController::class, 'getUnapprovedUsers']);
Route::post('approve-user', [UserController::class, 'approveUser']);
Route::get('get-all-users', [UserController::class, 'getAllUsers']);
Route::get('get-user/{userid}', [UserController::class, 'getUserById']);
Route::post('update-user', [UserController::class, 'updateUser']);
Route::get('get-all-courses', [CourseController::class, 'getAllCourses']);


Route::get('courses/getAllByInstructorId/{instructorId}', [CourseController::class, 'listAllByInstructorId']);
Route::get('courses/getCourseById/{courseId}', [CourseController::class, 'getById']);
Route::delete('courses/remove/{courseId}', [CourseController::class, 'removeCourse']);
Route::post('courses/create', [CourseController::class, 'create']);
Route::post('courses/update-course', [CourseController::class, 'updateCourse']);

Route::get('exams/getAllByCourseId/{courseId}', [ExamController::class, 'getAllByCourseId']);
Route::post('exams/create', [ExamController::class, 'create']);
Route::put('exams/update', [ExamController::class, 'update']);
Route::get('exams/getById/{id}', [ExamController::class, 'getById']);


Route::post('questions/replace', [QuestionController::class, 'replaceQuestions']);

Route::get('recommendations/{courseId}', [RecommendationController::class, 'getAllByCourseId']);


Route::get('objectives', [ObjectiveController::class, 'listAll']);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('verifyotp', [AuthController::class, 'verifyOTP']);
Route::post('resetpassword', [AuthController::class, 'forgotPassword']);
Route::put('newpassword', [AuthController::class, 'newPassword']);
