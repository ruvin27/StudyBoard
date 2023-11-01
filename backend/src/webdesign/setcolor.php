<?php
CorsHeaders::standardPost();

require_once(BASE_DIR . '/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->hexColor) && isset($data->id)) {
    $hexColor = mysqli_real_escape_string($connection, $data->hexColor);
    $id = mysqli_real_escape_string($connection, $data->id);

    $query = "UPDATE ColorTable SET hexColor = '$hexColor' WHERE id = '$id'";
    $result = mysqli_query($connection, $query);

    if ($result) {
        echo ('Color Updated');
    } else {
        echo "Error: " . mysqli_error($connection);
    }

} else {
    echo 'Incomplete data';
}


mysqli_close($connection);
?>
