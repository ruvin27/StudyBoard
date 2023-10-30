<?php
// Include your database connection code here (e.g., $conn)

// Get the data from the POST request
$data = json_decode(file_get_contents("php://input"));

if (isset($data->studentId, $data->examId, $data->courseId, $data->score)) {
    // Extract data
    $studentId = $data->studentId;
    $examId = $data->examId;
    $courseId = $data->courseId;
    $score = $data->score;

    // Connect to your database and perform the insert operation
    $conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Assuming you have a 'grade' table in your database
    $sql = "INSERT INTO grades (exam_id, course_id, student_id, date, score) 
            VALUES ('$examId', '$courseId', '$studentId', NOW(), $score)";
    
    if (mysqli_query($conn, $sql)) {
        $response = ["success" => "Score saved successfully"];
    } else {
        $response = ["error" => "Failed to save score"];
    }

    // Close the database connection
    mysqli_close($conn);
    
    // Return the response as JSON
    echo json_encode($response);
} else {
    $response = ["error" => "Invalid data received"];
    echo json_encode($response);
}
?>
