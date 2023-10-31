<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->courseId) && isset($data->userid)) {
    $courseId = mysqli_real_escape_string($conn, $data->courseId);
    $userid = mysqli_real_escape_string($conn, $data->userid);

    $sql = "SELECT e.exam_id, g.student_id, g.score as score, e.exam_title, e.score as total
    FROM exam e
    LEFT JOIN grades g ON e.exam_id = g.exam_id AND g.student_id = '$userid'
    WHERE e.course_id = '$courseId';
    ";

    $result = mysqli_query($conn, $sql);

    if ($result) {
        $examDetails = array();

        while ($row = mysqli_fetch_assoc($result)) {
            $examDetails[] = array(
                "exam_id" => $row['exam_id'],
                "course_id" => $courseId,
                "exam_title" => $row['exam_title'],
                "score" => $row['score'],
                "total" => $row['total']
            );
        }

        echo json_encode($examDetails);
    } else {
        echo json_encode(["error" => "Exam not found"]);
    }
} else {
    echo json_encode(["error" => "Invalid Exam ID or user ID"]);
}
?>
