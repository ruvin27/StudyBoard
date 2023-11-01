<?php

require_once(BASE_DIR . '/utils/Formatter.php');
require_once(BASE_DIR . '/service/QuestionService.php');

CorsHeaders::standardPost();

$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$required_fields = ['exam_id'];
$errors = Validator::validate($data, $required_fields);

if (!empty($errors)) {
    ApiResponse::error($errors, 400);
    die();
}

if (!isset($data->questions)) {
    ApiResponse::error("No questions provided", 400);
    die();
}

$questionsData = [];
if (is_array($data->questions)) {
    foreach ($data->questions as $question) {
        $required_question_fields = ['question', 'answer', 'mcq1', 'mcq2', 'mcq3', 'mcq4'];
        $errors = Validator::validate($question, $required_question_fields);

        if (!empty($errors)) {
            ApiResponse::error($errors, 400);
            die();
        }

        $questionsData[] = $question;
    }
}

if (count($questionsData) === 0) {
    ApiResponse::error("No questions provided", 400);
    die();
}

$questionService = new QuestionService();
$response = $questionService->replaceQuestions($data->exam_id, $questionsData);

if (!$response->isSuccess()) {
    ApiResponse::error("Failed to create questions", 500);
    die();
}

ApiResponse::success(null, $response->getMessage(), 201);
