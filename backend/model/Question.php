<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/ExamModel.php');
require_once(BASE_DIR . '/model/QuestionModel.php');

class Question
{
    private PDO $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function create(QuestionModel $questionData): bool
    {
        $stmt = $this->connection->prepare("
            INSERT INTO question (
                exam_id,
                question,
                answer,
                mcq1,
                mcq2,
                mcq3,
                mcq4
            ) VALUES (
                :exam_id,
                :question,
                :answer,
                :mcq1,
                :mcq2,
                :mcq3,
                :mcq4
            )");

        $stmt->bindParam(':exam_id', $questionData->examId);
        $stmt->bindParam(':question', $questionData->question);
        $stmt->bindParam(':answer', $questionData->answer);
        $stmt->bindParam(':mcq1', $questionData->mcq1);
        $stmt->bindParam(':mcq2', $questionData->mcq2);
        $stmt->bindParam(':mcq3', $questionData->mcq3);
        $stmt->bindParam(':mcq4', $questionData->mcq4);
        return $stmt->execute();
    }

}

