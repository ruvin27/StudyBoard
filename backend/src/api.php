<?php
$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die("Connection failed: " . mysqli_connect_error());
} else {
    echo "Connected";
}


$query = "SELECT * FROM user";
$result = mysqli_query($connection, $query);
if (!$result) {
    die("Query failed: " . mysqli_error($connection));
}

$roles = array();
while ($row = mysqli_fetch_assoc($result)) {
    $roles[] = $row;
}

echo json_encode($roles);
mysqli_close($connection);
?>
