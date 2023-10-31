<?php

class CorsHeaders
{

    const GET = 'GET';
    const POST = 'POST';
    const PUT = 'PUT';
    const DELETE = 'DELETE';

    public static function standardGet(): void
    {
        self::setHeaders(array(self::GET));
    }

    private static function setHeaders($methods): void
    {
        header('Access-Control-Allow-Origin: ' . FRONTEND_BASE_URL);
        header('Access-Control-Allow-Headers: Content-Type');
        $methods[] = 'OPTIONS'; // Add OPTIONS to the allowed methods
        $allowedMethods = implode(', ', $methods);
        header('Access-Control-Allow-Methods: ' . $allowedMethods);
        header('Access-Control-Allow-Credentials: true');
    }

    public static function standardPost(): void
    {
        self::setHeaders(array(self::POST));
    }

}
