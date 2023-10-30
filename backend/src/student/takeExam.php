<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->courseId) && isset($data->examId)) {

    $examId = mysqli_real_escape_string($conn, $data->examId);
    $courseId = mysqli_real_escape_string($conn, $data->courseId);
    $sql = "SELECT e.exam_id, q.question, q.mcq1, q.mcq2, q.mcq3, q.mcq4, q.answer
            FROM question q
            JOIN exam e ON e.exam_id = q.exam_id
            WHERE e.course_id = $courseId
            AND e.exam_id = $examId";
    $result = mysqli_query($conn, $sql);
    

    if ($result) {
        $takeExamDetails = array();
        
        while ($row = mysqli_fetch_assoc($result)) {
            $takeExamDetails[] = array(
                "exam_id" => $row['exam_id'],
                "question" => $row['question'],
                "mcq1" => $row['mcq1'],
                "mcq2" => $row['mcq2'],
                "mcq3" => $row['mcq3'],
                "mcq4" => $row['mcq4'],
                "answer" => $row['answer']
            );
        }

        echo json_encode($takeExamDetails);
    } else {
        echo json_encode(["error" => "Exam not found"]);
    }
} else {
    echo json_encode(["error" => "Invalid Exam ID or user ID"]);
}

?>

