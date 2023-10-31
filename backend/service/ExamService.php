<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/Exam.php');
require_once(BASE_DIR . '/model/ExamUpdateModel.php');

class ExamService
{
    private Exam $examRepository;

    public function __construct()
    {
        $this->examRepository = new Exam();
    }


    public function create(ExamModel $examData): ServiceResponse
    {
        $examId = $this->examRepository->create($examData);

        if (!$examId) {
            return ServiceResponse::error('Failed to create exam');
        }

        return ServiceResponse::success($examId, "Exam created successfully");
    }

    public function update($examId, ExamUpdateModel $examData): ServiceResponse
    {
        $examId = $this->examRepository->update($examId, $examData);

        if (!$examId) {
            return ServiceResponse::error('Failed to update exam');
        }

        return ServiceResponse::success(true, "Exam updated successfully");
    }
}

