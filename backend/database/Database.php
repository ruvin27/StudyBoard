<?php

class Database
{

    private static $instance;
    private $connection;

    private function __construct()
    {
        $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8';

        try {
            $this->connection = new PDO($dsn, DB_USER, DB_PASS);
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die("Database connection failed: " . $e->getMessage());
        }
    }

    /**
     * Directly fetch the PDO connection.
     *
     * @return PDO
     */
    public static function connect()
    {
        return self::getInstance()->getConnection();
    }

    /**
     * Get the database connection.
     *
     * @return PDO
     */
    private function getConnection()
    {
        return $this->connection;
    }

    /**
     * Get an instance of the Database.
     *
     * @return Database
     */
    private static function getInstance()
    {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }
}
