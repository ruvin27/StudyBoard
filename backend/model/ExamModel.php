<?php
require_once(BASE_DIR . '/model/QuestionModel.php');

class ExamModel
{
    public string $examTitle;
    public $examDate;
    public string $examDescription;
    public $examScore;
    public int $courseId;
    public int $studentId;
    public array $questions = [];

    public function __construct($examTitle, $examDate, $examDescription, $examScore, $courseId, $studentId, $questions = [])
    {
        $this->examTitle = $examTitle;
        $this->examDate = $examDate;
        $this->examDescription = $examDescription;
        $this->examScore = $examScore;
        $this->courseId = $courseId;
        $this->questions = $questions;
        $this->studentId = $studentId;
    }
}
