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

$courseId = urldecode($_GET["id"]);
$examService = new Exam();

$results = $examService->getAllByCourseId($courseId);

ApiResponse::success($results);