<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->courseId)) {
    $courseId = mysqli_real_escape_string($conn, $data->courseId);
    $userId = mysqli_real_escape_string($conn, $data->userId); // Use consistent variable name

    $sql = "SELECT e.exam_title, g.score as score, c.name, e.score as total
    FROM exam e
    JOIN grades g ON e.exam_id = g.exam_id 
    JOIN course c on g.course_id = c.course_id
    WHERE g.student_id = $userId AND g.course_id = $courseId;";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        $takeGradeDetails = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $takeGradeDetails[] = array(
                "exam_title" => $row['exam_title'],
                "score" => $row['score'],
                "name" => $row['name'],
                "total" => $row['total']
            );
        }

        echo json_encode($takeGradeDetails);
    } else {
        echo json_encode([]);
    }
} else {
    echo json_encode(["error" => "Invalid"]);
}
?>
