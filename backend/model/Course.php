<?php
require_once(BASE_DIR . '/database/Database.php');
require_once(BASE_DIR . '/model/CourseModel.php');

class Course
{
    private $connection;

    public function __construct()
    {
        $this->connection = Database::connect();
    }

    public function listAll(): array
    {
        $stmt = $this->connection->query("SELECT 
                c.course_id, 
                c.name AS course_name, 
                c.description AS course_description,
                c.start_date AS course_start_date,
                c.code AS course_code,
                c.end_date AS course_end_date,
                u.userid AS instructor_id,
                u.email AS instructor_email, 
                u.name AS instructor_name, 
                p.program_id, 
                p.program_name, 
                p.description AS program_description,
                s.userid AS student_id,
                s.email AS student_email,
                s.name AS student_name
            FROM 
                course c 
            JOIN 
                user u ON c.instructor_id = u.userid 
            JOIN 
                program p ON c.program_id = p.program_id
            LEFT JOIN
                enrollment sec ON c.course_id = sec.course_id
            LEFT JOIN
                user s ON sec.student_id = s.userid
        ");

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($result)) {
            return [];
        }

        return $result;
    }


    public function listAllByInstructorId($instructorId): array
    {
        $stmt = $this->connection->prepare("SELECT 
                    c.course_id, 
                    c.name AS course_name, 
                    c.description AS course_description,
                    c.start_date AS course_start_date,
                    c.end_date AS course_end_date,
                    c.code AS course_code,
                    u.userid AS instructor_id,
                    u.email AS instructor_email, 
                    u.name AS instructor_name, 
                    p.program_id, 
                    p.program_name, 
                    p.description AS program_description,
                    s.userid AS student_id,
                    s.email AS student_email,
                    s.name AS student_name
                FROM 
                    course c 
                JOIN 
                    user u ON c.instructor_id = u.userid 
                JOIN 
                    program p ON c.program_id = p.program_id
                LEFT JOIN
                    enrollment sec ON c.course_id = sec.course_id
                LEFT JOIN
                    user s ON sec.student_id = s.userid
                WHERE
                    c.instructor_id = :instructor_id
            ");
        $stmt->bindParam(':instructor_id', $instructorId);
        $stmt->execute();

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if (empty($result)) {
            return [];
        }

        return $result;
    }

    public function create(CourseModel $courseData)
    {
        $stmt = $this->connection->prepare("INSERT INTO course (name, description, start_date, end_date, code, instructor_id, program_id) VALUES (:name, :description, :start_date, :end_date, :code, :instructor_id, :program_id)");
        $stmt->bindParam(':name', $courseData->courseName);
        $stmt->bindParam(':description', $courseData->courseDescription);
        $stmt->bindParam(':start_date', $courseData->startDate);
        $stmt->bindParam(':end_date', $courseData->endDate);
        $stmt->bindParam(':code', $courseData->code);
        $stmt->bindParam(':instructor_id', $courseData->instructorId);
        $stmt->bindParam(':program_id', $courseData->programId);
        $stmt->execute();

        return $this->connection->lastInsertId();
    }

    public function removeStudent($courseId, $studentId): bool
    {
        $stmt = $this->connection->prepare("DELETE FROM enrollment WHERE course_id = :course_id AND student_id = :student_id");
        $stmt->bindParam(':course_id', $courseId);
        $stmt->bindParam(':student_id', $studentId);
        $stmt->execute();

        return $stmt->rowCount() > 0;
    }

    public function getById($courseId)
    {
        $stmt = $this->connection->prepare("SELECT 
                c.course_id, 
                c.name AS course_name, 
                c.description AS course_description,
                c.start_date AS course_start_date,
                c.end_date AS course_end_date,
                c.code AS course_code,
                u.userid AS instructor_id,
                u.email AS instructor_email, 
                u.name AS instructor_name, 
                p.program_id, 
                p.program_name, 
                p.description AS program_description,
                s.userid AS student_id,
                s.email AS student_email,
                s.name AS student_name
            FROM 
                course c 
            JOIN 
                user u ON c.instructor_id = u.userid 
            JOIN 
                program p ON c.program_id = p.program_id
            LEFT JOIN
                enrollment sec ON c.course_id = sec.course_id
            LEFT JOIN
                user s ON sec.student_id = s.userid
            WHERE
                c.course_id = :course_id
        ");
        $stmt->bindParam(':course_id', $courseId);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        if (empty($result)) {
            return null;
        }

        return $result;
    }

}

