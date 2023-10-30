DELETE
FROM enrollment;
DELETE
FROM comments;
DELETE
FROM grades;
DELETE
FROM question;
DELETE
FROM exam;
DELETE
FROM course;
DELETE
FROM user;
DELETE
FROM program;
DELETE
FROM colortable;

INSERT INTO user (userid, email, role, name, password, phone_number, verification_code, email_verified_at)
VALUES (1, 'instructor@app.com', 'Instructor', 'John Doe',
        '$2y$10$sfltmQxzMmWfrgD8k7PXI.dV5eoZltnKOtZoa528NfiHMiaX08OyC', '123-456-7890', 'SAMPLECODE',
        CURRENT_DATE);

INSERT INTO user (userid, email, role, name, password, phone_number, verification_code, email_verified_at)
VALUES (2, 'student@app.com', 'Student', 'John Doe', '$2y$10$sfltmQxzMmWfrgD8k7PXI.dV5eoZltnKOtZoa528NfiHMiaX08OyC',
        '123-456-7890', 'SAMPLECODE', CURRENT_DATE);

INSERT INTO program (program_id, program_name, description)
VALUES (1, 'Computer Science', 'Study of computation and information.');

INSERT INTO course (course_id, description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES (1, 'Introductory course to programming.', 'Introduction to Programming', 'CS101', CURRENT_DATE, CURRENT_DATE,
        'Sample objective', 1, 1);

INSERT INTO exam (exam_id, course_id, student_id, date, description, score, exam_title)
VALUES (1, 1, 2, CURRENT_DATE, 'Mid-term examination.', 100, 'Mid-Term');

INSERT INTO question (question_id, exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (1, 1, 'Which language is used for web apps?', 'PHP', 'PHP', 'Python', 'JavaScript', 'Java');

INSERT INTO grades (grade_id, exam_id, course_id, student_id, date, score)
VALUES (1, 1, 1, 2, CURRENT_DATE, 95);

INSERT INTO comments (comment_id, student_id, course_id, timestamp, message)
VALUES (1, 2, 1, CURRENT_TIMESTAMP, 'Great course!');

INSERT INTO enrollment (student_id, course_id)
VALUES (2, 1);

INSERT INTO `colortable` (`id`, `usedFor`, `hexColor`, `description`) VALUES
(1, 'theme', '007bff', 'Theme Color for the Website'),
(2, 'nav-bar-hover', 'ff6600', 'Hover Color for Navbar Links'),
(3, 'nav-bar', '333', 'Navbar background Color'),
(4, 'nav-bar-text', 'fff', 'NavBar Color for Links');

COMMIT;
