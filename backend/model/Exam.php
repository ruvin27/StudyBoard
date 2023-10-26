<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/ExamModel.php');

class Exam
{
    private PDO $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function create(ExamModel $examData)
    {
        $stmt = $this->connection->prepare("
            INSERT INTO exam (
                exam_title,
                date,
                description,
                score,
                course_id,
                student_id
            ) VALUES (
                :exam_title,
                :exam_date,
                :exam_description,
                :exam_score,
                :course_id,
                :student_id
            )");

        $stmt->bindParam(':exam_title', $examData->examTitle);
        $stmt->bindParam(':exam_date', $examData->examDate);
        $stmt->bindParam(':exam_description', $examData->examDescription);
        $stmt->bindParam(':exam_score', $examData->examScore);
        $stmt->bindParam(':course_id', $examData->courseId);
        $stmt->bindParam(':student_id', $examData->studentId);
        $stmt->execute();

        return $this->connection->lastInsertId();
    }

    public function getAllByInstructorId($instructorId): array
    {
        $stmt = $this->connection->prepare("
        SELECT 
            c.course_id, 
            c.name AS course_name, 
            c.description AS course_description,
            e.exam_id,
            e.exam_title,
            e.description AS exam_description,
            e.date AS exam_date,
            g.student_id,
            u.email AS student_email,
            u.name AS student_name,
            g.score AS grade_score
        FROM 
            course c 
        LEFT JOIN 
            exam e ON c.course_id = e.course_id
        LEFT JOIN
            grades g ON e.exam_id = g.exam_id
        LEFT JOIN
            user u ON g.student_id = u.userid
        WHERE 
            c.instructor_id = :instructor_id
    ");
        $stmt->bindParam(':instructor_id', $instructorId);
        $stmt->execute();

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($rows)) {
            return [];
        }

        $courses = [];
        foreach ($rows as $row) {
            if (!isset($courses[$row['course_id']])) {
                $courses[$row['course_id']] = [
                    'course_id' => $row['course_id'],
                    'course_name' => $row['course_name'],
                    'course_description' => $row['course_description'],
                    'exams' => []
                ];
            }

            if ($row['exam_id'] && !isset($courses[$row['course_id']]['exams'][$row['exam_id']])) {
                $courses[$row['course_id']]['exams'][$row['exam_id']] = [
                    'exam_id' => $row['exam_id'],
                    'exam_title' => $row['exam_title'],
                    'exam_description' => $row['exam_description'],
                    'exam_date' => $row['exam_date'],
                    'students' => []
                ];
            }

            if ($row['student_id']) {
                $courses[$row['course_id']]['exams'][$row['exam_id']]['students'][] = [
                    'student_id' => $row['student_id'],
                    'student_email' => $row['student_email'],
                    'student_name' => $row['student_name'],
                    'grade_score' => $row['grade_score']
                ];
            }
        }

        foreach ($courses as &$course) {
            $course['exams'] = array_values($course['exams']);
        }

        return array_values($courses);
    }

}

