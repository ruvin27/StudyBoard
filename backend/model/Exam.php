<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/ExamModel.php');
require_once(BASE_DIR . '/model/ExamUpdateModel.php');

class Exam
{
    private PDO $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function create(ExamModel $examData): string
    {
        $stmt = $this->connection->prepare("
            INSERT INTO exam (
                exam_title,
                date,
                description,
                score,
                course_id,
                exam_duration
            ) VALUES (
                :exam_title,
                :exam_date,
                :exam_description,
                :exam_score,
                :course_id,
                :exam_duration
            )");

        $stmt->bindParam(':exam_title', $examData->examTitle);
        $stmt->bindParam(':exam_date', $examData->examDate);
        $stmt->bindParam(':exam_description', $examData->examDescription);
        $stmt->bindParam(':exam_score', $examData->examScore);
        $stmt->bindParam(':course_id', $examData->courseId, PDO::PARAM_INT);
        $stmt->bindParam(':exam_duration', $examData->examDuration, PDO::PARAM_INT);
        $stmt->execute();

        return $this->connection->lastInsertId();
    }

    public function update($examId, ExamUpdateModel $examData): bool
    {
        $stmt = $this->connection->prepare("
        UPDATE exam
        SET
            exam_title = :exam_title,
            date = :exam_date,
            description = :exam_description,
            score = :exam_score,
            exam_duration = :exam_duration
        WHERE exam_id = :exam_id
    ");

        $stmt->bindParam(':exam_id', $examId, PDO::PARAM_INT);
        $stmt->bindParam(':exam_title', $examData->examTitle);
        $stmt->bindParam(':exam_date', $examData->examDate);
        $stmt->bindParam(':exam_description', $examData->examDescription);
        $stmt->bindParam(':exam_score', $examData->examScore);
        $stmt->bindParam(':exam_duration', $examData->examDuration, PDO::PARAM_INT);

        return $stmt->execute();
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
            e.exam_duration AS exam_duration,
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
                    'exam_duration' => $row['exam_duration'],
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

    public function getAllByCourseId($courseId): array|false
    {
        $stmt = $this->connection->prepare("
    SELECT 
        c.course_id,
        c.name AS course_name,
        c.description AS course_description,
        e.exam_id,
        e.exam_title,
        e.description AS exam_description,
        e.exam_duration,
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
        c.course_id = :course_id
    ");
        $stmt->bindParam(':course_id', $courseId);
        $stmt->execute();

        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($rows)) {
            return false;
        }

        $result = [
            'course' => [],
            'exams' => []
        ];

        foreach ($rows as $row) {
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


    public function getById($examId)
    {
        $stmt = $this->connection->prepare("
            SELECT 
                exam_id,
                exam_title,
                exam_duration,
                description AS exam_description,
                date AS exam_date,
                score AS exam_score
            FROM 
                exam
            WHERE 
                exam_id = :exam_id
            LIMIT 1
                ");
        $stmt->bindParam(':exam_id', $examId, PDO::PARAM_INT);
        $stmt->execute();

        $examRow = $stmt->fetch(PDO::FETCH_OBJ);
        if (!$examRow) {
            return null;
        }

        // Now, get all related questions
        $stmt = $this->connection->prepare("
            SELECT 
                question_id,
                question,
                answer,
                mcq1,
                mcq2,
                mcq3,
                mcq4
            FROM 
                question
            WHERE 
                exam_id = :exam_id
                ");
        $stmt->bindParam(':exam_id', $examId, PDO::PARAM_INT);
        $stmt->execute();

        $questions = $stmt->fetchAll(PDO::FETCH_OBJ);

        $examRow->questions = $questions;

        return $examRow;
    }


}

