<?php
CorsHeaders::standardGet();

require_once(BASE_DIR . '/config.php');

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
}


$query = "SELECT * FROM user where approved=0";
$result = mysqli_query($connection, $query);

if ($result) {
    $users = array(); // Initialize an array to store messages

    while ($row = mysqli_fetch_assoc($result)) {
        $user = array(
            "email" => $row['email'],
            "userId" => $row['userid'],
            "role" => $row['role']
        );

        $users[] = $user;
    }

    echo json_encode($users);
} else {
    echo "Error: " . mysqli_error($connection);
}


mysqli_close($connection);
?>
