<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');
//require('../config.php');
//require('../../Vendor/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_GET['courseId'])) {
    $courseId = mysqli_real_escape_string($connection, $_GET['courseId']);

$query = "SELECT DISTINCT exam_title FROM exam WHERE course_id = $courseId";
$result = mysqli_query($connection, $query);

if ($result) {
    $examTitles = array(); // Initialize an array to store exam IDs

    while ($row = mysqli_fetch_assoc($result)) {
        $examTitles[] = $row['exam_title'];
    }

    echo json_encode($examTitles);
} else {
    echo "Error: " . mysqli_error($connection);
}

mysqli_close($connection);
}
?>
