<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->courseId)) {
    $courseId = mysqli_real_escape_string($conn, $data->courseId);

    $sql = "SELECT u.name, e.student_id, e.course_id, u.role
    FROM enrollment e
    INNER JOIN user u ON e.student_id = u.userid
    WHERE e.course_id = $courseId;";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        $peopleDetails = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $peopleDetails[] = array(
                "name" => $row['name'],
                "student_id" => $row['student_id'],
                "course_id" => $row['course_id'],
                "role" => $row['role']
            );
        }

        echo json_encode($peopleDetails);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode(["error" => "Invalid"]);
}
?>
