<?php

require_once(BASE_DIR . '/model/Course.php');

CorsHeaders::standardPost();

$course = new Course();

$request_body = file_get_contents('php://input');
$course_data = json_decode($request_body);

$requiredFields = ['course_id', 'name', 'description', 'start_date', 'end_date', 'code', 'objective'];
$errors = Validator::validate($course_data, $requiredFields);
if ($errors) {
    ApiResponse::error($errors, 400);
    die();
}


$courseData = new CourseUpdateModel(
    $course_data->name,
    $course_data->description,
    $course_data->start_date,
    $course_data->end_date,
    $course_data->code,
    $course_data->objective
);

$course_id = $course->update($course_data->course_id, $courseData);

if (!$course_id) {
    ApiResponse::error("Failed to update course", 500);
    die();
}

ApiResponse::success($course_id, "Course updated successfully");
