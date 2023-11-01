<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$json = file_get_contents('php://input');
$data = json_decode($json);
if (isset($data->userid) && isset($data->course_id)) {
    $userid = mysqli_real_escape_string($conn, $data->userid);
    $course_id = mysqli_real_escape_string($conn, $data->course_id);
    $deleteEnrollmentQuery = "DELETE FROM enrollment WHERE student_id = '$userid' AND course_id = '$course_id'";
    
    $deleteResult = mysqli_query($conn, $deleteEnrollmentQuery);
    
    if ($deleteResult) {
        // Record successfully deleted from the enrollment table
        echo json_encode(array("message" => "Record deleted successfully"));
    } else {
        // Error deleting the record
        echo json_encode(array("error" => "Error deleting the record"));
    }
} else {
    // Required parameters not provided
    echo json_encode(array("error" => "user_id and course_id parameters are required"));
}
?>
