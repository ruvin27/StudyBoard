<?php
require_once(BASE_DIR . '/model/Question.php');

class QuestionService
{
    private Question $questionRepository;

    public function __construct()
    {
        $this->questionRepository = new Question();
    }

    public function create(QuestionModel $question): ServiceResponse
    {
        $result = $this->questionRepository->create($question);

        if (!$result) {
            return ServiceResponse::error('Failed to create question');
        }

        return ServiceResponse::success(true, 'Question created successfully');
    }
}

