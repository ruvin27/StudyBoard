<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST');
//require('../config.php'); // Adjust the path as necessary

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch QA Policies from the database
    $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $sql = "SELECT * FROM qa_policies";
    $result = mysqli_query($connection, $sql);

    if ($result) {
        $row = mysqli_fetch_assoc($result);
        echo json_encode($row);
    } else {
        echo "Error: " . mysqli_error($connection);
    }

    mysqli_close($connection);
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle updating QA Policies in the database
    $data = json_decode(file_get_contents('php://input'), true);

    $connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if (!$connection) {
        die("Connection failed: " . mysqli_connect_error());
    }

    $policies = mysqli_real_escape_string($connection, $data['policies']);
    $sql = "UPDATE qa_policies SET policies = '$policies' WHERE id = 1";

    if (mysqli_query($connection, $sql)) {
        echo "QA Policies updated successfully.";
    } else {
        echo "Error updating QA Policies: " . mysqli_error($connection);
    }

    mysqli_close($connection);
}
?>
