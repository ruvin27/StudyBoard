<?php
require_once(BASE_DIR . '/service/AuthService.php');

CorsHeaders::standardPost();

$json = file_get_contents('php://input');
$data = json_decode($json);

$requiredFields = ['email'];
$errors = Validator::validate($data, $requiredFields);
if ($errors) {
    ApiResponse::error($errors, 400);
    die();
}

$authService = new AuthService();
$result = $authService->forgotPassword($data->email);

ApiResponse::success($result->getData(), $result->getMessage());


