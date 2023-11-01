<?php

$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM course";
$result = mysqli_query($conn, $sql);

if ($result) {
    $courses = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $course = array(
            "name" => $row['name'],
            "course_id" => $row['course_id'],
        );
        $courses[] = $course; 
    }

    echo json_encode($courses);
}
?>
