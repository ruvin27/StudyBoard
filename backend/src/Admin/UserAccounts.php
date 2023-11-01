<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$data = json_decode($json);



if (isset($data->email) && isset($data->course_id)) {
    $email = mysqli_real_escape_string($conn, $data->email);
    $course_id = mysqli_real_escape_string($conn, $data->course_id);
    $getUserIDQuery = "SELECT userid FROM user WHERE email = '$email'";

    $userResult = mysqli_query($conn, $getUserIDQuery);
    
        if ($userResult) {
            $userRow = mysqli_fetch_assoc($userResult);
            $user_id = $userRow['userid'];

            $insertEnrollmentQuery = "INSERT INTO enrollment (student_id, course_id) VALUES ('$user_id', '$course_id')";
            $insertResult = mysqli_query($conn, $insertEnrollmentQuery);
            if ($insertResult) {
                // Data successfully inserted into the enrollment table
                echo json_encode(array("message" => "Data inserted successfully"));
            } else {
                // Error inserting data into the enrollment table
                echo json_encode(array("error" => "Error inserting data"));
            }
        } else {
            echo json_encode(array("error" => "User not found"));
        }


}
else {
    // Required parameters not provided
    echo json_encode(array("error" => "Email and course parameters are required"));
}
?>
