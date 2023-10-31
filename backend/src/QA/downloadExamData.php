<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET');
//require('../config.php');
//require('../../Vendor/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_GET['exam_title']) && isset($_GET['courseId'])) {
    $exam_title = mysqli_real_escape_string($connection, $_GET['exam_title']);
    $courseId = mysqli_real_escape_string($connection, $_GET['courseId']); // Get courseId from the query parameter

    // SQL query to fetch exam data for a specific exam_id
    $sqlStudentData = "
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
            enrollment en ON en.student_id = g.student_id
        INNER JOIN
            user u ON u.userid = en.student_id
        WHERE
            e.exam_title = '$exam_title' AND g.course_id = $courseId
        ORDER BY
            u.name, e.exam_title
    ";

    $sqlClassData = "
    SELECT
            e.exam_title AS exam_name,
            AVG(g.score) AS class_average,
            e.score AS total,
            (SUM(g.score) / SUM(e.score)) * 100 AS class_marks_percentage
        FROM
            exam e
        INNER JOIN
            grades g ON e.exam_id = g.exam_id
        WHERE
            e.exam_title = '$exam_title' AND g.course_id = $courseId
        GROUP BY
            e.exam_title, total
    ";

    $resultStudentData = mysqli_query($connection, $sqlStudentData);
    $resultClassData = mysqli_query($connection, $sqlClassData);

    if ($resultStudentData && $resultClassData) {
        header('Content-Type: text/csv');
        header('Content-Disposition: attachment; filename="exam_data.csv"');

        //output student data
        $output = fopen('php://output', 'w');
        fputcsv($output, array('student_name', 'exam_name', 'exam_marks', 'total_marks'));

        while ($row = mysqli_fetch_assoc($resultStudentData)) {
            fputcsv($output, $row);
        }

        // output class data
        fputcsv($output, array(''));
        fputcsv($output, array('exam_name', 'class_average', 'total', 'class_marks_percentage'));
        while ($row = mysqli_fetch_assoc($resultClassData)) {
            fputcsv($output, $row);
        }
        fclose($output);
    }
}

mysqli_close($connection);
?>
