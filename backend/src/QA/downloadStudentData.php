<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');
//require('../../Vendor/config.php');
//require('../config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_GET['name'])) {
    $student_name = mysqli_real_escape_string($connection, $_GET['name']);

    // SQL query to fetch student data for a specific student_id
    $sql = "
    SELECT
    u.name AS student_name,
    e.exam_title AS exam_name,
    g.score AS exam_marks,
    e.score AS total_marks
    FROM
        exam e
    INNER JOIN
        grades g ON e.exam_id = g.exam_id
    INNER JOIN
        User u ON e.student_id = u.userid
    WHERE
        u.name = '$student_name'
    ORDER BY
        u.name, e.exam_title
    ";
    $result = mysqli_query($connection, $sql);

    if ($result) {
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="student_data.csv"');

        $output = fopen('php://output', 'w');
        fputcsv($output, array('student_name', 'exam_name', 'exam_marks', 'total_marks'));

        while ($row = mysqli_fetch_assoc($result)) {
            fputcsv($output, $row);
        }

        fclose($output);
    }
}

mysqli_close($connection);
?>
