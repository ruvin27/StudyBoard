<?php
require_once(BASE_DIR . '/service/AuthService.php');

# CorsHeaders::standardPost();
require_once(BASE_DIR . '/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
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
    $user = $result->getData();
    $role = $user['role'];
    $sql = "Insert into user_activity (User_email, Role)
    VALUES ('$data->email', '$role');";
    $insertResult = mysqli_query($connection, $sql);
    ApiResponse::success($result->getData());
} else {
    ApiResponse::error($result->getMessage(), 401);
}
