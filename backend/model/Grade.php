<?php
require_once(BASE_DIR . '/database/Database.php');

class Grade
{
    private $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function getAllByStudentId($studentId)
    {
        $stmt = $this->connection->prepare("SELECT 
                g.grade_id,
                g.exam_id,
                g.course_id,
                g.date,
                g.score,
                e.exam_title,
                c.course_name
            FROM 
                grades g
            JOIN 
                exam e ON g.exam_id = e.exam_id
            JOIN 
                course c ON g.course_id = c.course_id
            WHERE
                g.student_id = :student_id
            ");
        $stmt->bindParam(':student_id', $studentId);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($result)) {
            return [];
        }

        return $result;
    }


}

