<?php

class CourseModel
{
    public string $courseName;
    public string $courseDescription;
    public int $instructorId;
    public int $programId;
    public int $startDate;
    public int $endDate;
    public int $code;

    public function __construct($courseName, $courseDescription, $instructorId, $programId, $startDate, $endDate, $code)
    {
        $this->courseName = $courseName;
        $this->courseDescription = $courseDescription;
        $this->instructorId = $instructorId;
        $this->programId = $programId;
        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->code = $code;
    }
}
