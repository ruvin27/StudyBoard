<?php

require_once(BASE_DIR . '/service/CourseService.php');

CorsHeaders::standardPost();


$request_body = file_get_contents('php://input');
$course_data = json_decode($request_body);

$requiredFields = ["course_id"];
$errors = Validator::validate($course_data, $requiredFields);
if ($errors) {
    ApiResponse::error($errors, 400);
    die();
}


$courseService = new CourseService();

$result = $courseService->remove($course_data->course_id);

if (!$result->isSuccess()) {
    ApiResponse::error($result->getMessage(), 400);
    die();
}

ApiResponse::success($result->getData(), $result->getMessage());
