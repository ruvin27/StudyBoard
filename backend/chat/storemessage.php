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

if (isset($data->sender) && isset($data->receiver) && isset($data->message)) {
    $sender = mysqli_real_escape_string($connection, $data->sender);
    $receiver = mysqli_real_escape_string($connection, $data->receiver);
    $message = mysqli_real_escape_string($connection, $data->message);

    $query = "INSERT INTO messages (sender, receiver, message) VALUES ('$sender', '$receiver', '$message')";
    if (mysqli_query($connection, $query)) {
        echo true;
    } else {
        echo("Registration Failed");
    } 


} else {
    echo 'Incomplete data';
}

mysqli_close($connection);
?>
