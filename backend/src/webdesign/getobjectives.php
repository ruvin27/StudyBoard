<?php
CorsHeaders::standardGet();

require_once(BASE_DIR . '/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json);


$query = "SELECT * FROM objectives";
$result = mysqli_query($connection, $query);

if ($result) {
    $objectives = array(); // Initialize an array to store messages

    while ($row = mysqli_fetch_assoc($result)) {
        $objective = array(
            "objective_id" => $row['objective_id'],
            "objective" => $row['objective']
        );

        $objectives[] = $objective;
    }

    echo json_encode($objectives);
} else {
    echo "Error: " . mysqli_error($connection);
}


mysqli_close($connection);
?>
