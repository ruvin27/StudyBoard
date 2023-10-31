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

$query = "SELECT DISTINCT u.name FROM user u
INNER JOIN grades g ON u.userid = g.student_id
WHERE g.course_id = $courseId";
$result = mysqli_query($connection, $query);

if ($result) {
    $studentNames = array(); // Initialize an array to store student IDs

    while ($row = mysqli_fetch_assoc($result)) {
        $studentNames[] = $row['name'];
    }

    echo json_encode($studentNames);
} else {
    echo "Error: " . mysqli_error($connection);
}

mysqli_close($connection);
}
?>
