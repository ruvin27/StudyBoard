<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$query = "SELECT u.email AS User_email, u.userid, 'Student' AS Role, c.name AS Course, c.course_id
          FROM user AS u
          JOIN enrollment AS e ON u.userid = e.student_id
          JOIN course AS c ON e.course_id = c.course_id";

$result = mysqli_query($conn, $query);

if ($result) {
    $userData = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $userData[] = $row;
    }
    echo json_encode($userData);
} else {
    echo json_encode(array("error" => "Error fetching user data"));
}
?>
