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

    public function replaceQuestions($examId, array $questionsData): ServiceResponse
    {
        try {
            // Begin a transaction
            $this->questionRepository->beginTransaction();

            // Delete existing questions for the exam
            $deleteResult = $this->questionRepository->deleteByExamId($examId);
            if (!$deleteResult) {
                $this->questionRepository->rollBack();
                return ServiceResponse::error('Failed to delete existing questions');
            }

            // Insert the new questions
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
                    $this->questionRepository->rollBack();
                    return ServiceResponse::error('Failed to create question');
                }
            }

            // Commit the transaction
            $this->questionRepository->commit();

            return ServiceResponse::success(null, 'Questions replaced successfully');

        } catch (Exception $e) {
            // Roll back the transaction and return an error response in case of any exception
            $this->questionRepository->rollBack();
            return ServiceResponse::error('An error occurred while replacing questions');
        }
    }
}
