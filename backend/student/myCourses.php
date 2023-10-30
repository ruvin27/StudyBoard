<?php

$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$data = json_decode($json);


if (isset($data->userid)) {
    $user_id = mysqli_real_escape_string($conn, $data->userid);
    $sql="  SELECT
            c.name,
            c.description,
            c.instructor_id,
            c.course_id,
            u.name AS instructor_name
        FROM
            course AS c
        INNER JOIN
            enrollment AS sec
            ON c.course_id = sec.course_id
        INNER JOIN
            user AS u
            ON c.instructor_id = u.userid
        WHERE
            sec.student_id = '$user_id';";
    

    $result = mysqli_query($conn, $sql);

    if ($result) {
        $courses = array(); 
    
        while ($row = mysqli_fetch_assoc($result)) {
            $course = array(
                "name" => $row['name'],
                "course_desc" => $row['description'],
                "course_id" => $row['course_id'],
                "instructor_name" => $row['instructor_name']
            );
    
            $courses[] = $course;
        }
    
        echo json_encode($courses);
    }
}
?>

