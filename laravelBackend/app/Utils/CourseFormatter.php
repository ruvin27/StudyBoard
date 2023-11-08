<?php
namespace App\Utils;

class CourseFormatter
{
    function formatInstructorResponse(array $results)
    {
        $courses = [];
        foreach ($results as $row) {
            $courseId = $row["course_id"];
            if (!isset($courses[$courseId])) {
                $courses[$courseId] = [
                    "course_id" => $row["course_id"],
                    "course_name" => $row["course_name"],
                    "course_description" => $row["course_description"],
                    "course_start_date" => $row["course_start_date"],
                    "course_end_date" => $row["course_end_date"],
                    "course_code" => $row["course_code"],
                    "instructor" => [
                        "instructor_id" => $row["instructor_id"],
                        "email" => $row["instructor_email"],
                        "name" => $row["instructor_name"]
                    ],
                    "program" => [
                        "program_id" => $row["program_id"],
                        "program_name" => $row["program_name"],
                        "description" => $row["program_description"]
                    ],
                    "students" => []
                ];
            }
            if (!empty($row["student_id"])) {
                $courses[$courseId]["students"][] = [
                    "student_id" => $row["student_id"],
                    "email" => $row["student_email"],
                    "name" => $row["student_name"]
                ];
            }
        }

        return array_values($courses);
    }

    function formatCourseResponse($result)
    {
        // dd($result);
        if ($result == null) {
            return null;
        }

        $course = [
            "course_id" => $result["course_id"],
            "course_name" => $result["course_name"],
            "course_description" => $result["course_description"],
            "course_start_date" => $result["course_start_date"],
            "course_end_date" => $result["course_end_date"],
            "course_code" => $result["course_code"],
            "instructor" => [
                "instructor_id" => $result["instructor_id"],
                "email" => $result["instructor_email"],
                "name" => $result["instructor_name"]
            ],
            "program" => [
                "program_id" => $result["program_id"],
                "program_name" => $result["program_name"],
                "description" => $result["program_description"]

            ],
            "students" => []
        ];

        if (!empty($result["student_id"])) {
            $course["students"][] = [
                "student_id" => $result["student_id"],
                "email" => $result["student_email"],
                "name" => $result["student_name"]
            ];
        }

        return $course;
    }
}