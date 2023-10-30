<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->userid)) {
    // Assuming you want to fetch courses based on the user ID.
    $userid = mysqli_real_escape_string($conn, $data->userid);

    $sql = "SELECT c.course_id, c.description, c.name AS course_name, c.code, c.program_id, c.objective, u.name AS instructor_name FROM course c INNER JOIN user u ON u.userid = c.instructor_id;
    ";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        $allCourseDetails = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $allCourseDetails[] = array(
                "name" => $row['course_name'],
                "instructor_name" => $row['instructor_name'],
                "course_id" => $row['course_id'],
                "code" => $row['code']
            );
        }

        echo json_encode($allCourseDetails);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>
