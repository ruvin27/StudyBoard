<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: GET, POST');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}

// If there's a search query in the GET request, use it to filter the results
$searchTerm = isset($_GET['search']) ? $_GET['search'] : "";

// Fetch user account data
$sql = "SELECT ua.User_email, ua.Role, ua.Last_logged_in
        FROM user_activity ua
        LEFT JOIN user us
        on ua.User_email = us.email
        WHERE ua.User_email LIKE '%$searchTerm%'"; // Use the search term in the SQL query

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
