<?php
require_once(BASE_DIR . '/model/Question.php');

class QuestionService
{
    private Question $questionRepository;

    public function __construct()
    {
        $this->questionRepository = new Question();
    }

    public function createQuestions($examId, array $questionsData): ServiceResponse
    {
        foreach ($questionsData as $questionData) {
            $questionModel = new QuestionModel(
                $examId,
                $questionData->question,
                $questionData->answer,
                $questionData->mcq1,
                $questionData->mcq2,
                $questionData->mcq3,
                $questionData->mcq4
            );

            $result = $this->create($questionModel);
            if (!$result->isSuccess()) {
                return ServiceResponse::error('Failed to create question');
            }
        }

        return ServiceResponse::success(null, 'Questions created successfully');
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
