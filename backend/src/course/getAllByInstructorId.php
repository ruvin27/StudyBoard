<?php

require_once(BASE_DIR . '/utils/Formatter.php');
require_once(BASE_DIR . '/model/Course.php');

CorsHeaders::standardGet();

$requiredFields = ['id'];
$errors = Validator::validate((object)$_GET, $requiredFields);
if ($errors) {
    ApiResponse::error($errors, 400);
    die();
}


$instructorId = urldecode($_GET["id"]);
$courseService = new Course();

$results = $courseService->listAllByInstructorId($instructorId);


ApiResponse::success(formatInstructorResponse($results));