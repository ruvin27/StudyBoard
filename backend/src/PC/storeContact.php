<?php
CorsHeaders::standardPost();

require_once(BASE_DIR . '/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->email) && isset($data->message)) {
    $email = mysqli_real_escape_string($connection, $data->email);
    $message = mysqli_real_escape_string($connection, $data->message);

    $query = "INSERT INTO contact (email, message) VALUES
    ('$email', '$message');
    ";
    if (mysqli_query($connection, $query)) {
        echo ("Response Sent");
    } else {
        echo("Registration Failed");
    }


} else {
    echo 'Incomplete data';
}

mysqli_close($connection);
?>
