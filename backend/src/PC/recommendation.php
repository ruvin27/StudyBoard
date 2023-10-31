<?php
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->course_id) && isset($data->sender_id) && isset($data->message)) {
    // Assuming you want to fetch courses based on the user ID.
    $course_id = mysqli_real_escape_string($conn, $data->course_id);
    $sender_id = mysqli_real_escape_string($conn, $data->sender_id);
    $message = mysqli_real_escape_string($conn, $data->message);


    $sql = "INSERT INTO recommendation (course_id, sender_id, message) VALUES ('$course_id', '$sender_id', '$message');";

    $result = mysqli_query($conn, $sql);

    if ($result) {

        echo ("Message Sent");
    } else {
        echo ("Message not Sent");
    }
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>
