<?php
namespace App\Utils;

class ExamFormatter
{
    function formatAllExamsResponse(array $exams)
    {
        $result = [
            'course' => [],
            'exams' => []
        ];

        foreach ($exams as $row) {
            if (empty($result['course'])) {
                $result['course'] = [
                    'course_id' => $row['course_id'],
                    'course_name' => $row['course_name'],
                    'course_description' => $row['course_description']
                ];
            }

            if ($row['exam_id'] && !isset($result['exams'][$row['exam_id']])) {
                $result['exams'][$row['exam_id']] = [
                    'exam_id' => $row['exam_id'],
                    'exam_title' => $row['exam_title'],
                    'exam_description' => $row['exam_description'],
                    'exam_date' => $row['exam_date'],
                    'exam_duration' => $row['exam_duration'],
                    'students' => []
                ];
            }

            if ($row['student_id']) {
                $result['exams'][$row['exam_id']]['students'][] = [
                    'student_id' => $row['student_id'],
                    'student_email' => $row['student_email'],
                    'student_name' => $row['student_name'],
                    'grade_score' => $row['grade_score']
                ];
            }
        }

        $result['exams'] = array_values($result['exams']);
        return $result;
    }
}