<?php

require_once(BASE_DIR . '/model/Course.php');

CorsHeaders::standardPost();

$course = new Course();

$request_body = file_get_contents('php://input');
$course_data = json_decode($request_body);

$requiredFields = ['name', 'description', 'instructor_id', 'program_id', 'start_date', 'end_date', 'code'];
$errors = Validator::validate($course_data, $requiredFields);
if ($errors) {
    ApiResponse::error($errors, 400);
    die();
}


$courseData = new CourseModel(
    $course_data->name,
    $course_data->description,
    $course_data->instructor_id,
    $course_data->program_id,
    $course_data->start_date,
    $course_data->end_date,
    $course_data->code
);

$course_id = $course->create($courseData);

if (!$course_id) {
    ApiResponse::error("Failed to create course", 500);
    die();
}

ApiResponse::success($course_id, "Course created successfully");
