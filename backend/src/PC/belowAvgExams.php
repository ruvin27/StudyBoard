<?php
CorsHeaders::standardGet();

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
e.score as total,
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
AVG(g.score) / e.score < 0.7;
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
        $total = $exam['total'];
        $avg_score = $exam['class_avg'];
        $checkSql = "SELECT * FROM exam_resolution WHERE exam_id = '$examId'";
        $checkResult = mysqli_query($connection, $checkSql);

        if (!$checkResult || mysqli_num_rows($checkResult) == 0) {
            // If not present, add the exam_resolution entry
            $addSql = "INSERT INTO exam_resolution (exam_id, qa_officer_resolved, program_coordinator_resolved, avg_score, total) VALUES ('$examId', 0, 0, '$avg_score', '$total')";
            mysqli_query($connection, $addSql);
        }
        else{
            $addSql = "UPDATE exam_resolution SET total = '$total', avg_score = '$avg_score'
            WHERE exam_id = '$examId';";
            mysqli_query($connection, $addSql);
        }
    }
    $query = "SELECT
    e.exam_id,
    e.exam_title,
    qa_officer_resolved,
    program_coordinator_resolved,
    c.name,
    er.total as total,
    er.avg_score
FROM
    exam_resolution er, exam e, course c
    where e.exam_id = er.exam_id and e.course_id = c.course_id;";
    $fetchResult = mysqli_query($connection, $query);

    if ($fetchResult) {
        $responses = array(); 

        while ($row = mysqli_fetch_assoc($fetchResult)) {
            $responses[] = $row;
        }

        echo json_encode($responses);
    }
    else {
        echo json_encode([]);
    }
} else {
    echo json_encode([]);
}

mysqli_close($connection);
?>
