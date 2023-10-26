<?php
require_once(BASE_DIR . '/service/AuthService.php');

CorsHeaders::standardPost();

$json = file_get_contents('php://input');
$data = json_decode($json);

$requiredFields = ['email', 'password', 'name', 'phone_number', 'role'];
$errors = Validator::validate($data, $requiredFields);
if ($errors) {
    ApiResponse::error($errors, 400);
    die();
}

$authService = new AuthService();

$userData = new UserModel(
    $data->email,
    $data->password,
    $data->name,
    $data->phone_number,
    $data->role
);

$result = $authService->register($userData);

ApiResponse::success(null, $result->getMessage());


