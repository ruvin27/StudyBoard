<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->courseId)) {
    $courseId = mysqli_real_escape_string($conn, $data->courseId);

    // Modify the SQL query to select course details by course_id
    $sql = "SELECT *
            FROM course
            WHERE course_id = '$courseId'";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        $courseDetails = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $courseDetails = array(
                "name" => $row['name'],
                "description" => $row['description'],
                "instructor_id" => $row['instructor_id'],
                "course_id" => $courseId,
                "code" => $row['code'],
                "start_date" => $row['start_date'],
                "end_date" => $row['end_date'],
            );
        }

        echo json_encode($courseDetails);
    } else {
        echo json_encode(["error" => "Course not found"]);
    }
} else {
    echo json_encode(["error" => "Invalid course ID"]);
}
?>
