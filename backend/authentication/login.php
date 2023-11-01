<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
require('../config.php');
require_once(BASE_DIR . '/service/AuthService.php');

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
    $authService->updateUserActivity($data->email, $result->getData()['role']);
    ApiResponse::success($result->getData());
} else {
    ApiResponse::error($result->getMessage(), 401);
}

if (isset($data->email) && isset($data->password)) {
    $email = mysqli_real_escape_string($connection, $data->email);
    $password = $data->password;

    $query = "SELECT * FROM user WHERE email = '$email'";
    $res = mysqli_query($connection, $query);

    if ($res && mysqli_num_rows($res) > 0) {
        $row = mysqli_fetch_assoc($res);
        if (password_verify($password, $row['password'])) {
            echo json_encode($row);
        } else {
            echo "Incorrect password";
        }
    } else {
        echo "User not found";
    }
} else {
    echo 'Incomplete data';
}

mysqli_close($connection);
?>