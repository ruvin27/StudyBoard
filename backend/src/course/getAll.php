<?php

require_once(BASE_DIR . '/model/Course.php');
require_once(BASE_DIR . '/utils/Formatter.php');

CorsHeaders::standardGet();

$courseService = new Course();

$results = $courseService->listAll();

ApiResponse::success(formatInstructorResponse($results));