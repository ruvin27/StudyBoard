<?php

require_once(BASE_DIR . '/utils/Formatter.php');
require_once(BASE_DIR . '/model/Exam.php');

CorsHeaders::standardGet();

$requiredFields = ['id'];
$errors = Validator::validate($_GET, $requiredFields);
if ($errors) {
    ApiResponse::error($errors, 400);
    die();
}

$examId = urldecode($_GET["id"]);
$examService = new Exam();

$result = $examService->getById($examId);

if (!$result) {
    ApiResponse::error("Exam not found", 404);
    die();
}

ApiResponse::success($result);