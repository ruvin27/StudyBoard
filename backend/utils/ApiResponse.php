<?php

class ApiResponse
{
    public static function success($data = null, $message = null, $code = 200,): void
    {
        header('Content-Type: application/json');
        http_response_code($code);
        echo json_encode(array(
            "code" => $code,
            "status" => ($code >= 200 && $code < 300) ? 'success' : 'error',
            "data" => $data,
            "message" => $message,
        ));
    }

    public static function error($message, $code): void
    {
        header('Content-Type: application/json');
        http_response_code($code);
        echo json_encode(array(
            "code" => $code,
            "status" => 'error',
            "data" => null,
            "message" => $message,
        ));
    }
}
