<?php
require_once(BASE_DIR . '/database/Database.php');

class Objective
{
    private PDO $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function listAll(): array
    {
        $stmt = $this->connection->query("SELECT * from objectives where program_id = 1");
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($result)) {
            return [];
        }

        return $result;
    }


}

