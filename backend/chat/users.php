<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
require('../config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}


$query = "SELECT email FROM user";
$res = mysqli_query($connection, $query);

if ($res) {
    $emails = array(); // Initialize an array to store the email addresses

    while ($row = mysqli_fetch_assoc($res)) {
        $emails[] = $row['email']; // Append each email to the array
    }

    // Echo the array as a JSON response
    echo json_encode($emails);
} else {
    // Handle the query error, if any
    echo "Error: " . mysqli_error($connection);
}


mysqli_close($connection);
?>
