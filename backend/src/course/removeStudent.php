<?php

require_once(BASE_DIR . '/utils/Formatter.php');
require_once(BASE_DIR . '/model/Course.php');

CorsHeaders::standardPost();

$course = new Course();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$required_fields = ['student_id', 'course_id'];
foreach ($required_fields as $field) {
    if (!isset($data->$field) || empty(trim($data->$field))) {
        ApiResponse::error("Missing or empty field: $field", 400);
        die();
    }
}

$response = $course->removeStudent($data->course_id, $data->student_id);

if (!$response) {
    ApiResponse::error("Failed to remove student from course", 500);
    die();
}

ApiResponse::success(null, "Student removed successfully");
