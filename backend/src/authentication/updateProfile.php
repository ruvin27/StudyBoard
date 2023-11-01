<?php
CorsHeaders::standardPost();

require_once(BASE_DIR . '/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->email) && isset($data->name) && isset($data->phone)) {
    $email = mysqli_real_escape_string($connection, $data->email);
    $name = mysqli_real_escape_string($connection, $data->name);
    $phone = mysqli_real_escape_string($connection, $data->phone);

    $query = "UPDATE user
    SET name = '$name', phone_number = '$phone'
    WHERE email = '$email';
    ";
    if (mysqli_query($connection, $query)) {
        echo ("Profile Updated");
    } else {
        echo("Registration Failed");
    }


} else {
    echo 'Incomplete data';
}

mysqli_close($connection);
?>
