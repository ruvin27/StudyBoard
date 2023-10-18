<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');
require('../config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

$json = file_get_contents('php://input');
$data = json_decode($json);

if (isset($data->sender) && isset($data->receiver)) {
    $sender = mysqli_real_escape_string($connection, $data->sender);
    $receiver = mysqli_real_escape_string($connection, $data->receiver);

    $query = "SELECT * FROM messages WHERE (sender = '$sender' AND receiver = '$receiver') OR (sender = '$receiver' AND receiver = '$sender')";
    $result = mysqli_query($connection, $query);

    if ($result) {
        $messages = array(); // Initialize an array to store messages
    
        while ($row = mysqli_fetch_assoc($result)) {
            $message = array(
                "sender" => ($row['sender'] === $sender) ? "You" : $row['sender'],
                "message" => $row['message']
            );
    
            $messages[] = $message;
        }
    
        echo json_encode($messages);
    }else {
        echo "Error: " . mysqli_error($connection);
    }


} else {
    echo 'Incomplete data';
}

mysqli_close($connection);
?>
