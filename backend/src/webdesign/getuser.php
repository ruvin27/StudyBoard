<?php
CorsHeaders::standardPost();

require_once(BASE_DIR . '/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->userId)) {
    $userId = mysqli_real_escape_string($connection, $data->userId);

$query = "SELECT * FROM user where userid = '$userId'";
$result = mysqli_query($connection, $query);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
} else {
    echo "Error: " . mysqli_error($connection);
}

} else {
    echo 'Incomplete data';
}


mysqli_close($connection);
?>
