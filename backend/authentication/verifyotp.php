<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
require('../config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->email) && isset($data->otp)) {
    $email = mysqli_real_escape_string($connection, $data->email);
    $otp = mysqli_real_escape_string($connection, $data->otp);

    $query = "SELECT * FROM user WHERE email = '$email' AND verification_code = '$otp'";
    $res = mysqli_query($connection, $query);

    if ($res && mysqli_num_rows($res) > 0) {
        // OTP is correct; update the email_verified_at field
        $updateQuery = "UPDATE user SET email_verified_at = NOW() WHERE email = '$email' AND verification_code = '$otp'";
        $updateResult = mysqli_query($connection, $updateQuery);

        if ($updateResult) {
            $query = "SELECT * FROM user WHERE email = '$email'";
            $res = mysqli_query($connection, $query);
            $row = mysqli_fetch_assoc($res);
            echo json_encode($row);
        } else {
            echo "Failed to update email verification status";
        }
    } else {
        echo "Incorrect OTP";
    }
} else {
    echo 'Incomplete data';
}

mysqli_close($connection);
?>
