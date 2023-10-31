<?php

require_once(BASE_DIR . '/utils/Formatter.php');
require_once(BASE_DIR . '/service/RecommendationService.php');

CorsHeaders::standardGet();

$requiredFields = ['id'];
$errors = Validator::validate((object)$_GET, $requiredFields);
if ($errors) {
    ApiResponse::error($errors, 400);
    die();
}


$courseId = urldecode($_GET["id"]);
$recommendationService = new RecommendationService();

$results = $recommendationService->getAllByCourseId($courseId);
ApiResponse::success($results);