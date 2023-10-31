<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/ExamModel.php');
require_once(BASE_DIR . '/model/QuestionModel.php');

class Recommendation
{
    private PDO $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function getAllByCourseId($course_id)
    {
        $query = "
        SELECT 
            r.recommendation_id,
            r.message AS recommendation_message,
            r.course_id,
            c.name AS course_name,
            c.description AS course_description,
            u.userid AS sender_id,
            u.name AS sender_name,
            u.email AS sender_email,
            u.role AS sender_role
        FROM 
            recommendation r
        JOIN 
            course c ON r.course_id = c.course_id
        JOIN 
            user u ON r.sender_id = u.userid
        WHERE 
            r.course_id = :course_id
    ";

        $stmt = $this->connection->prepare($query);
        $stmt->bindParam(':course_id', $course_id);
        $stmt->execute();

        $recommendations = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $recommendations[] = $row;
        }

        return $recommendations;
    }


}

