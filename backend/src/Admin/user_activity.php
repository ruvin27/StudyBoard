<?php
require_once(BASE_DIR . '/config.php');


$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}
$json = file_get_contents('php://input');
$data = json_decode($json);
// If there's a search query in the GET request, use it to filter the results

// Fetch user account data
$sql = "SELECT * from user_activity"; // Use the search term in the SQL query

$result = mysqli_query($connection, $sql);

if ($result) {
    $userAccounts = array();

    while ($row = mysqli_fetch_assoc($result)) {
        $userAccounts[] = $row;
    }

    echo json_encode($userAccounts);
} else {
    echo json_encode([]);
}

mysqli_close($connection);
?>
