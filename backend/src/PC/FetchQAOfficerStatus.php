<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "
    SELECT
        e.exam_id,
        e.exam_title,
        qa_officer_resolved,
        program_coordinator_resolved,
        c.name
    FROM
        exam_resolution er, exam e, course c
        where e.exam_id = er.exam_id and e.course_id = c.course_id;
        
";

$result = mysqli_query($connection, $sql);

if ($result) {
    $resolutionStatus = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $resolution = [
            'qa_officer_resolved' => $row['qa_officer_resolved'],
            'program_coordinator_resolved' => $row['program_coordinator_resolved'],
            'exam_id' => $row['exam_id'],
            'title' => $row['exam_title'],
            'name' => $row['name'],
        ];
    }
    $resolutionStatus[] = $resolution;
    echo json_encode($resolutionStatus);
} else {
    echo json_encode([]);
}

mysqli_close($connection);
?>
