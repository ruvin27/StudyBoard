<?php
CorsHeaders::standardPost();

require_once(BASE_DIR . '/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->objective) && isset($data->objective_id)) {
    $objective = mysqli_real_escape_string($connection, $data->objective);
    $objective_id = mysqli_real_escape_string($connection, $data->objective_id);

    $query = "UPDATE objectives SET objective = '$objective' WHERE objective_id = '$objective_id'";
    $result = mysqli_query($connection, $query);

    if ($result) {
        echo ('Objective Updated');
    } else {
        echo "Error: " . mysqli_error($connection);
    }

} else {
    echo 'Incomplete data';
}


mysqli_close($connection);
?>
