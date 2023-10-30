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


-------------------

-- Inserting questions into the database

-- Questions for exam_id = 1
INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (1, 'Which technology is commonly used for server-side scripting?', 'PHP', 'HTML', 'JavaScript', 'CSS');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (1, 'What is the capital of France?', 'Paris', 'London', 'Berlin', 'Madrid');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (1, 'Which planet is known as the Red Planet?', 'Mars', 'Venus', 'Earth', 'Jupiter');

-- Questions for exam_id = 2
INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (2, 'Which technology is commonly used for server-side scripting?', 'PHP', 'HTML', 'JavaScript', 'CSS');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (2, 'What is the capital of France?', 'Paris', 'London', 'Berlin', 'Madrid');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (2, 'Which planet is known as the Red Planet?', 'Mars', 'Venus', 'Earth', 'Jupiter');

-- Questions for exam_id = 3
INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (3, 'Which technology is commonly used for server-side scripting?', 'PHP', 'HTML', 'JavaScript', 'CSS');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (3, 'What is the capital of France?', 'Paris', 'London', 'Berlin', 'Madrid');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (3, 'Which planet is known as the Red Planet?', 'Mars', 'Venus', 'Earth', 'Jupiter');

-- Questions for exam_id = 4
INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (4, 'Which technology is commonly used for server-side scripting?', 'PHP', 'HTML', 'JavaScript', 'CSS');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (4, 'What is the capital of France?', 'Paris', 'London', 'Berlin', 'Madrid');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (4, 'Which planet is known as the Red Planet?', 'Mars', 'Venus', 'Earth', 'Jupiter');

-- Questions for exam_id = 6
INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (6, 'Which technology is commonly used for server-side scripting?', 'PHP', 'HTML', 'JavaScript', 'CSS');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (6, 'What is the capital of France?', 'Paris', 'London', 'Berlin', 'Madrid');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (6, 'Which planet is known as the Red Planet?', 'Mars', 'Venus', 'Earth', 'Jupiter');

-- Questions for exam_id = 7
INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (7, 'Which technology is commonly used for server-side scripting?', 'PHP', 'HTML', 'JavaScript', 'CSS');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (7, 'What is the capital of France?', 'Paris', 'London', 'Berlin', 'Madrid');

INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (7, 'Which planet is known as the Red Planet?', 'Mars', 'Venus', 'Earth', 'Jupiter');
 --------------

 -- Inserting data into the "program" table

-- Program 1
INSERT INTO program (program_id, program_name, description, start_date, end_date)
VALUES (1, 'Computer Science', 'Bachelor of Computer Science', '2023-09-01', '2027-06-30');

-- Program 2
INSERT INTO program (program_id, program_name, description, start_date, end_date)
VALUES (2, 'Electrical Engineering', 'Bachelor of Electrical Engineering', '2023-09-01', '2027-06-30');

-- Program 3
INSERT INTO program (program_id, program_name, description, start_date, end_date)
VALUES (3, 'Business Administration', 'Bachelor of Business Administration', '2023-09-01', '2027-06-30');

-----------------------------

-- Inserting data into the "exam" table

-- Exam 1
INSERT INTO exam (exam_id, course_id, student_id, date, description, score, exam_title)
VALUES (1, 5, 2, '2023-10-26', 'Final Exam for Programming 101', 92.50, 'Programming 101 Final Exam');

-- Exam 2
INSERT INTO exam (exam_id, course_id, student_id, date, description, score, exam_title)
VALUES (2, 6, 4, '2023-10-26', 'Mid-term Exam for DB Management', 85.00, 'DB Management Mid-term Exam');

-- Exam 3
INSERT INTO exam (exam_id, course_id, student_id, date, description, score, exam_title)
VALUES (3, 7, 2, '2023-10-26', 'Web Dev 101 Quiz', 76.50, 'Web Dev 101 Quiz');

-- Exam 4
INSERT INTO exam (exam_id, course_id, student_id, date, description, score, exam_title)
VALUES (4, 9, 3, '2023-10-26', 'Advanced Web Development Final Exam', 94.00, 'Advanced Web Development Final Exam');

-- Exam 5
INSERT INTO exam (exam_id, course_id, student_id, date, description, score, exam_title)
VALUES (5, 5, 3, '2023-10-27', 'Second Programming Exam', 85.00, 'Programming 101 Second Exam');

-- Exam 6
INSERT INTO exam (exam_id, course_id, student_id, date, description, score, exam_title)
VALUES (6, 5, 3, '2023-10-28', 'Third Programming Exam', 88.00, 'Programming 101 Third Exam');
-------------------------
-- Inserting data into the "enrollment" table

-- Enrollment 1
INSERT INTO enrollment (student_id, course_id)
VALUES (2, 5);

-- Enrollment 2
INSERT INTO enrollment (student_id, course_id)
VALUES (2, 6);

-- Enrollment 3
INSERT INTO enrollment (student_id, course_id)
VALUES (2, 7);

-- Enrollment 4
INSERT INTO enrollment (student_id, course_id)
VALUES (3, 7);

-- Enrollment 5
INSERT INTO enrollment (student_id, course_id)
VALUES (3, 8);

-- Enrollment 6
INSERT INTO enrollment (student_id, course_id)
VALUES (3, 5);
-----------------------

-- Inserting data into the "course" table

-- Course 1
INSERT INTO course (course_id, description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES (5, 'This course is designed as an introduction to programming fundamentals.', 'Programming 101', 'PROG101', '2023-01-15', '2023-04-15', 'Learn the basics of programming', 1, 5);

-- Course 2
INSERT INTO course (course_id, description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES (6, 'This course focuses on the principles and techniques of database management.', 'DB Management', 'DBM101', '2023-02-20', '2023-05-20', 'Learn how to manage databases', 1, 1);

-- Course 3
INSERT INTO course (course_id, description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES (7, 'Web Development 101 is an introductory course to web development.', 'Web Dev 101', 'WEB101', '2023-03-10', '2023-06-10', 'Introduction to web development', 2, 1);

-- Course 4
INSERT INTO course (course_id, description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES (8, 'Machine Learning Fundamentals is a course that introduces basic machine learning concepts.', 'ML Fundamentals', 'ML101', '2023-04-05', '2023-07-05', 'Basic concepts of machine learning', 2, 1);

-- Course 5
INSERT INTO course (course_id, description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES (9, 'Advanced Web Development covers advanced web development techniques.', 'Advanced Web Development', 'WEB201', '2023-04-10', '2023-07-10', 'Advanced web development techniques', 2, 1);

-- Course 6
INSERT INTO course (course_id, description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES (10, 'Data Analysis with Python is a course for learning data analysis using Python.', 'Data Analysis', 'DATA101', '2023-05-15', '2023-08-15', 'Learn data analysis using Python', 1, 5);

-- Course 7
INSERT INTO course (course_id, description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES (11, 'Artificial Intelligence is an introduction to artificial intelligence concepts.', 'AI101', 'AI101', '2023-06-20', '2023-09-20', 'Introduction to artificial intelligence', 3, 5);

-- Course 8
INSERT INTO course (course_id, description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES (12, 'Database Administration is a course for managing and optimizing databases.', 'DB Admin', 'DBA101', '2023-07-10', '2023-10-10', 'Manage and optimize databases', 1, 5);
-----------------

