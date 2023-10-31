<?php

class CourseUpdateModel
{
    public string $courseName;
    public string $courseDescription;
    public string $startDate;
    public string $endDate;
    public string $code;

    public string $objective;

    public function __construct($courseName, $courseDescription, $startDate, $endDate, $code, $objective)
    {
        $this->courseName = $courseName;
        $this->courseDescription = $courseDescription;

        $this->startDate = $startDate;
        $this->endDate = $endDate;
        $this->code = $code;
        $this->objective = $objective;
    }
}
