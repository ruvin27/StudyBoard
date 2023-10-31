<?php
include 'dbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();
$method = $_SERVER['REQUEST_METHOD'];
switch($method) {
    case "POST":
        $recommendation = json_decode(file_get_contents("php://input"));
        $courseName = $recommendation->courseName;
        $instructorName = $recommendation->instructorName;
        $message = $recommendation->message;

        $sql = "INSERT INTO recommendation (courseName, instructorName, message) VALUES (:courseName, :instructorName, :message)";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':courseName', $courseName);
        $stmt->bindParam(':instructorName', $instructorName);
        $stmt->bindParam(':message', $message);

        if($stmt->execute()){
            $response=[
                'status' => 1,
                'status_message' =>'Recommendation Added Successfully.'
            ];
        }else{
            $response=[
                'status' => 0,
                'status_message' =>'Recommendation Addition Failed.'
            ];
        }
        echo json_encode($response);
        break;
}
?>
