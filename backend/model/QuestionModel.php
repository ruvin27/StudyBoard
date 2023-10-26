<?php

class QuestionModel
{
    public int $examId;
    public string $question;
    public string $answer;
    public string $mcq1;
    public string $mcq2;
    public string $mcq3;
    public string $mcq4;

    public function __construct($examId, $question, $answer, $mcq1, $mcq2, $mcq3, $mcq4)
    {
        $this->examId = $examId;
        $this->question = $question;
        $this->answer = $answer;
        $this->mcq1 = $mcq1;
        $this->mcq2 = $mcq2;
        $this->mcq3 = $mcq3;
        $this->mcq4 = $mcq4;
    }
}
