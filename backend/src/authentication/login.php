<?php
require_once(BASE_DIR . '/service/AuthService.php');

# CorsHeaders::standardPost();

$json = file_get_contents('php://input');
$data = json_decode($json);

$requiredFields = ['email', 'password'];
$errors = Validator::validate($data, $requiredFields);

if ($errors) {
    ApiResponse::error($errors, 400);
    die();
}

$authService = new AuthService();
$result = $authService->login($data->email, $data->password);

if ($result->isSuccess()) {
    ApiResponse::success($result->getData());
} else {
    ApiResponse::error($result->getMessage(), 401);
}
