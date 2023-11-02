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
            $sql = "SELECT * FROM enrollment where student_id='$user_id' and course_id = '$course_id';";
            $sqlresult = mysqli_query($conn, $sql);
            if(!$sqlresult || mysqli_num_rows($sqlresult) == 0){
                $insertEnrollmentQuery = "INSERT INTO enrollment (student_id, course_id) VALUES ('$user_id', '$course_id')";
                $insertResult = mysqli_query($conn, $insertEnrollmentQuery);
                if ($insertResult) {
                    echo("Data inserted successfully");
                } else {
                    echo("User has Access");
                }
            }else {
                echo("User has Access");
            }
               
        } else {
            echo("User not found");
        }


}
else {
    // Required parameters not provided
    echo json_encode(array("error" => "Email and course parameters are required"));
}
?>
