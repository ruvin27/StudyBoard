<?php
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Headers: Content-Type');
header('Access-Control-Allow-Methods: POST');

function handleErrors($errno, $errstr, $errfile, $errline) {
    $errorMessage = "$errstr in $errfile on line $errline";
    header('Content-Type: application/json');
    echo json_encode(['success' => false, 'message' => "PHP Error: $errorMessage"]);
    exit();
}

set_error_handler("handleErrors");

$connection = mysqli_connect(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if (!$connection) {
    die(json_encode(['success' => false, 'message' => "Connection failed: " . mysqli_connect_error()]));
}

$data = json_decode(file_get_contents('php://input'));

if (!isset($data->examId) || !isset($data->resolvedBy)) {
    echo json_encode(['success' => false, 'message' => "Invalid data provided"]);
    exit;
}

$examId = mysqli_real_escape_string($connection, $data->examId);
$resolvedBy = mysqli_real_escape_string($connection, $data->resolvedBy);

if ($resolvedBy === "QA Officer") {
    $updateSql = "UPDATE exam_resolution
    SET qa_officer_resolved = 1
    WHERE exam_id = '$examId';
    ";
} else if ($resolvedBy === "Program Coordinator") {
    $updateSql = "UPDATE exam_resolution
    SET program_coordinator_resolved = 1
    WHERE exam_id = '$examId';
    ";
} else {
    echo json_encode(['success' => false, 'message' => "Invalid resolution type"]);
    exit;
}

$result = mysqli_query($connection, $updateSql);

if ($result) {
    echo json_encode(['success' => true, 'message' => '']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error recording the resolution action: ' . mysqli_error($connection)]);
}

mysqli_close($connection);
?>
