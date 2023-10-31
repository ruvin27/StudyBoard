<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');
require('config.php'); // Include your database configuration file

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// SQL query to fetch QA policies and processes
$sql = "SELECT policies FROM qa_policies WHERE id = 1"; // You can adjust the WHERE clause as needed

$result = mysqli_query($connection, $sql);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    echo json_encode($row);
} else {
    echo "Error: " . mysqli_error($connection);
}

mysqli_close($connection);
?>
