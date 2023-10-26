<?php
/**
 * This file is the entry point for all requests.
 * It is responsible for including the correct file
 */

//ini_set('display_errors', 0);
//ini_set('log_errors', 1);

require 'vendor/autoload.php';
require 'config.php';
require 'utils/CorsHeaders.php';
require 'utils/ServiceResponse.php';
require 'utils/ApiResponse.php';
require 'utils/Formatter.php';
require 'utils/Validator.php';

if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Get the request URI without any query parameters
$request = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request = str_replace("/backend", '', $request);
$targetFile = "src{$request}";

// Check if the target file exists and include it
if (file_exists($targetFile) && is_file($targetFile)) {
    include $targetFile;
} else {
    // Handle cases where the target file doesn't exist
    // For example, you could display a 404 error
    header("HTTP/1.0 404 Not Found");
    echo "404 Not Found";
}

