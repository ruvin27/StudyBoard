<?php

require_once(BASE_DIR . '/utils/Formatter.php');
require_once(BASE_DIR . '/model/ExamService.php');

CorsHeaders::standardPost();


$request_body = file_get_contents('php://input');
$data = json_decode($request_body);

$required_fields = ['exam_title', 'exam_date', 'exam_description', 'exam_score', 'course_id', 'student_id'];
$errors = Validator::validate($data, $required_fields);

if (!empty($errors)) {
    ApiResponse::error($errors, 400);
    die();
}

$questions = [];
if (isset($data->questions) && is_array($data->questions)) {
    foreach ($data->questions as $question) {

        $required_question_fields = ['question', 'answer', 'mcq1', 'mcq2', 'mcq3', 'mcq4'];
        $errors = Validator::validate($question, $required_question_fields);

        if (!empty($errors)) {
            ApiResponse::error($errors, 400);
            die();
        }

        $questions[] = new QuestionModel(null, $question->question, $question->answer, $question->mcq1, $question->mcq2, $question->mcq3, $question->mcq4);
    }
}

$examDataInstance = new ExamModel(
    $data->exam_title,
    $data->exam_date,
    $data->exam_description,
    $data->exam_score,
    $data->course_id,
    $data->student_id,
    $questions
);

$examService = new ExamService();
$response = $examService->create($examDataInstance);

if (!$response->isSuccess()) {
    ApiResponse::error("Failed to create exam", 500);
    die();
}

ApiResponse::success($response->getData(), $response->getMessage(), 201);
