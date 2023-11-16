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
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PolicyController;
use App\Http\Controllers\ResolutionController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\PeopleController;

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
Route::get('courses/get-user-courses/{userid}', [CourseController::class, 'getUserCourses']);


Route::get('exams/getAllByCourseId/{courseId}', [ExamController::class, 'getAllByCourseId']);
Route::post('exams/create', [ExamController::class, 'create']);
Route::put('exams/update', [ExamController::class, 'update']);
Route::get('exams/getById/{id}', [ExamController::class, 'getById']);
Route::get('exams/get-by-student-course/{courseId}/{userId}', [ExamController::class, 'getExamDetailsByStudentId']);


Route::post('questions/replace', [QuestionController::class, 'replaceQuestions']);

Route::get('recommendations/{courseId}', [RecommendationController::class, 'getAllByCourseId']);
Route::post('store-recommendation', [RecommendationController::class, 'storeRecommendation']);


Route::get('objectives', [ObjectiveController::class, 'listAll']);
Route::put('update-objective', [ObjectiveController::class, 'updateObjective']);

Route::get('get-policies', [PolicyController::class, 'listAll']);
Route::put('update-policies', [PolicyController::class, 'updatePolicy']);

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);
Route::post('verifyotp', [AuthController::class, 'verifyOTP']);
Route::post('resetpassword', [AuthController::class, 'forgotPassword']);
Route::put('newpassword', [AuthController::class, 'newPassword']);


Route::get('get-all-emails', [ChatController::class, 'getAllEmails']);
Route::post('get-messages', [ChatController::class, 'getMessages']);
Route::post('store-message', [ChatController::class, 'storeMessage']);

Route::post('store-contact', [ContactController::class, 'storeContactResponse']);
Route::get('get-contact-responses', [ContactController::class, 'listAll']);


Route::get('get-below-avg-exams', [ResolutionController::class, 'getBelowAvgExams']);
Route::put('resolve-below-avg-exams', [ResolutionController::class, 'updateResolution']);

Route::get('get-students-by-course/{courseId}', [GradeController::class, 'getStudentsByCourseId']);
Route::get('download-grades-by-exam/{courseId}/{examId}', [GradeController::class, 'downloadExamData']);
Route::get('download-grades-by-student/{userid}/{courseId}', [GradeController::class, 'downloadStudentGrades']);

Route::get('/get-people-details/{courseId}', [PeopleController::class, 'getPeopleDetails']);
