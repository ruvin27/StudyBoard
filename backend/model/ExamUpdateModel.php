<?php
require_once(BASE_DIR . '/model/QuestionModel.php');

class ExamUpdateModel
{
    public string $examTitle;
    public $examDate;
    public string $examDescription;
    public $examScore;
    public $examDuration;

    public function __construct($examTitle, $examDate, $examDescription, $examScore, $examDuration)
    {
        $this->examTitle = $examTitle;
        $this->examDate = $examDate;
        $this->examDescription = $examDescription;
        $this->examScore = $examScore;
        $this->examDuration = $examDuration;
    }
}
