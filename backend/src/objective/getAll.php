<?php

require_once(BASE_DIR . '/utils/Formatter.php');
require_once(BASE_DIR . '/service/ObjectiveService.php');

CorsHeaders::standardGet();


$objectiveService = new ObjectiveService();

$results = $objectiveService->listAll();
ApiResponse::success($results->getData(), $results->getMessage());