<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/ExamModel.php');

class ExamService
{
    private Exam $examRepository;
    private QuestionService $questionService;

    public function __construct()
    {
        $this->questionService = new QuestionService();
        $this->examRepository = new Exam();
    }

    public function create(ExamModel $examData): ServiceResponse
    {
        $examId = $this->examRepository->create($examData);

        if (!$examId) {
            return ServiceResponse::error('Failed to create exam');
        }

        foreach ($examData->questions as $question) {
            $this->questionService->create(new QuestionModel(
                    $examId,
                    $question->question,
                    $question->answer,
                    $question->mcq1,
                    $question->mcq2,
                    $question->mcq3,
                    $question->mcq4
                )
            );
        }

        return ServiceResponse::success($examId, "Exam created successfully");
    }
}

