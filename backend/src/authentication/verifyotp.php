<?php
require_once(BASE_DIR . '/service/AuthService.php');

CorsHeaders::standardPost();

$json = file_get_contents('php://input');
$data = json_decode($json);

$requiredFields = ['email', 'otp'];
$errors = Validator::validate($data, $requiredFields);

if (!empty($errors)) {
    ApiResponse::error($errors, 400);
    die();
}

$authService = new AuthService();
$result = $authService->verifyOTP($data->email, $data->otp);

ApiResponse::success(null, $result->getMessage());