<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/Course.php');

class CourseService
{
    private Course $courseRepository;

    public function __construct()
    {
        $this->courseRepository = new Course();
    }


    public function remove($courseId): ServiceResponse
    {
        $result = $this->courseRepository->remove($courseId);

        if (!$result) {
            return ServiceResponse::error('Failed to remove course');
        }

        return ServiceResponse::success(true, "Course removed successfully");
    }

}

