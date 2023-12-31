<?php

require_once(BASE_DIR . '/utils/Formatter.php');
require_once(BASE_DIR . '/service/ExamService.php');

CorsHeaders::standardPost();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$required_fields = ['exam_title', 'exam_date', 'exam_description', 'exam_score', 'course_id', 'exam_duration'];
$errors = Validator::validate($data, $required_fields);

if (!empty($errors)) {
    ApiResponse::error($errors, 400);
    die();
}


$examDataInstance = new ExamModel(
    $data->exam_title,
    $data->exam_date,
    $data->exam_description,
    $data->exam_score,
    $data->course_id,
    $data->exam_duration
);

$examService = new ExamService();
$response = $examService->create($examDataInstance);

if (!$response->isSuccess()) {
    ApiResponse::error("Failed to create exam", 500);
    die();
}

ApiResponse::success($response->getData(), $response->getMessage(), 201);
