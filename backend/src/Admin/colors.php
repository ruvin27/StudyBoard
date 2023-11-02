<?php
CorsHeaders::standardGet();

require_once(BASE_DIR . '/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json);


$query = "SELECT * FROM ColorTable";
$result = mysqli_query($connection, $query);

if ($result) {
    $colors = array(); // Initialize an array to store messages

    while ($row = mysqli_fetch_assoc($result)) {
        $color = array(
            "id" => $row['id'],
            "usedFor" => $row['usedFor'],
            "hexColor" => $row['hexColor'],
            "desc" => $row['description']
        );

        $colors[] = $color;
    }

    echo json_encode($colors);
} else {
    echo "Error: " . mysqli_error($connection);
}


mysqli_close($connection);
?>
