<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// First, retrieve exams with an average below 70
$sql = "
    SELECT
        c.name AS course_name,
        e.exam_title AS exam_name,
        AVG(g.score) AS class_avg,
        e.exam_id,
        e.course_id
    FROM
        exam e
    INNER JOIN
        grades g ON e.exam_id = g.exam_id
    INNER JOIN
        course c ON e.course_id = c.course_id
    GROUP BY
        e.exam_id
    HAVING
        AVG(g.score) < 70
    ORDER BY
        c.name, e.exam_title
";

$result = mysqli_query($connection, $sql);

if ($result) {
    $belowAverageExams = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $belowAverageExams[] = $row;
    }

    // Now, check if each of these exams is in the exam_resolution table and add if not
    foreach ($belowAverageExams as $exam) {
        $examId = $exam['exam_id'];
        $checkSql = "SELECT * FROM exam_resolution WHERE exam_id = '$examId'";
        $checkResult = mysqli_query($connection, $checkSql);

        if (!$checkResult || mysqli_num_rows($checkResult) == 0) {
            // If not present, add the exam_resolution entry
            $addSql = "INSERT INTO exam_resolution (exam_id, qa_officer_resolved, program_coordinator_resolved) VALUES ('$examId', 0, 0)";
            mysqli_query($connection, $addSql);
        }
    }

    echo json_encode($belowAverageExams);
} else {
    echo json_encode([]);
}

mysqli_close($connection);
?>
