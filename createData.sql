-- Truncate all tables to delete all records and reset auto_increment
TRUNCATE TABLE enrollment;
TRUNCATE TABLE objectives;
TRUNCATE TABLE exam_resolution;
TRUNCATE TABLE recommendation;
TRUNCATE TABLE messages;
TRUNCATE TABLE comments;
TRUNCATE TABLE grades;
TRUNCATE TABLE question;
TRUNCATE TABLE exam;
TRUNCATE TABLE course;
TRUNCATE TABLE program;
TRUNCATE TABLE user;
TRUNCATE TABLE qa_policies;
TRUNCATE TABLE ColorTable;

-- Insert 1 record for an instructor and a student in the 'user' table
INSERT INTO user (email, role, name, password, phone_number, verification_code, email_verified_at, approved)
VALUES ('instructor@app.com', 'Instructor', 'John Doe', '$2y$10$sfltmQxzMmWfrgD8k7PXI.dV5eoZltnKOtZoa528NfiHMiaX08OyC',
        '123-456-7890', 'SAMPLECODE', CURRENT_DATE, 1),
       ('student@app.com', 'Student', 'Jane Doe', '$2y$10$sfltmQxzMmWfrgD8k7PXI.dV5eoZltnKOtZoa528NfiHMiaX08OyC',
        '123-456-7891', 'SAMPLECODE', CURRENT_DATE, 1),
('ruvin27@gmail.com', 'Admin', 'Ruvin Admin', '$2y$10$4yekZaGJzjQcHJ1vZsRYrOVn.8ReyK7/70Kg2NMAFj5CjcWqLRzWi',
        '6823746900', 'SAMPLECODE', CURRENT_DATE, 1);
-- Insert 1 record in the 'program' table
INSERT INTO program (program_name, description)
VALUES ('Computer Science', 'Study of computation and information.');

-- Insert 1 record in the 'course' table
INSERT INTO course (description, name, code, start_date, end_date, objective, program_id, instructor_id)
VALUES ('Introductory course to programming.', 'Introduction to Programming', 'CS101', CURRENT_DATE, CURRENT_DATE,
        'Sample objective', 1, 1);

-- Insert 1 record in the 'exam' table
INSERT INTO exam (course_id, exam_duration, date, description, score, exam_title)
VALUES (1, 90, CURRENT_DATE, 'Mid-term examination.', 100, 'Mid-Term');

-- Insert 1 record in the 'question' table
INSERT INTO question (exam_id, question, answer, mcq1, mcq2, mcq3, mcq4)
VALUES (1, 'Which language is used for web apps?', 'PHP', 'PHP', 'Python', 'JavaScript', 'Java');

-- Insert 1 record in the 'grades' table
INSERT INTO grades (exam_id, course_id, student_id, date, score)
VALUES (1,1, 2, CURRENT_DATE, 95);

-- Insert 1 record in the 'comments' table
-- INSERT INTO comments (student_id, course_id, timestamp, message)
-- VALUES (2, 1, CURRENT_TIMESTAMP, 'Great course!');

-- Insert 1 record in the 'enrollment' table
INSERT INTO enrollment (student_id, course_id)
VALUES (2, 1);

-- Insert 1 record in the 'exam_resolution' table
-- INSERT INTO exam_resolution (exam_id, qa_officer_resolved, program_coordinator_resolved)
-- VALUES (1, 1, 1);

-- Insert 1 record in the 'qa_policies' table
INSERT INTO qa_policies (policies)
VALUES ('Academic Integrity Policy:
This policy outlines the university''s expectations for academic honesty and integrity.
It includes rules on plagiarism, cheating, and consequences for violations.

Code of Conduct:
A code of conduct sets the expectations for student behavior on and off campus.
It may cover issues such as harassment, discrimination, and disruptive behavior.

Admissions Policy:
This policy explains the criteria and procedures for admitting students to the university.
It includes information on admission requirements and application deadlines.

Privacy Policy:
This policy explains how the university collects, uses, and protects student and employee data.');


-- Insert 1 record in the 'ColorTable' table
INSERT INTO colortable (`id`, `usedFor`, `hexColor`, `description`) VALUES
(1, 'theme', '007bff', 'Theme Color for the Website'),
(2, 'nav-bar-hover', 'ff6600', 'Hover Color for Navbar Links'),
(3, 'nav-bar', '333', 'Navbar background Color'),
(4, 'nav-bar-text', 'fff', 'NavBar Color for Links');

-- Insert 1 record in the 'objectives' table
INSERT INTO objectives (program_id, objective)
VALUES (1, 'To provide a comprehensive understanding of computer science.'),
    (1, 'To develop problem-solving skills using programming languages.'),
    (1, 'To introduce fundamental concepts in data structures and algorithms.'),
    (1, 'To foster creativity and innovation in software development.'),
    (1, 'To prepare students for careers in software engineering and related fields');

-- Insert 1 record in the 'recommendation' table
INSERT INTO recommendation (course_id, message, sender_id)
VALUES (1, 'Highly recommended for beginners.', 1);

-- Insert 1 record in the 'messages' table
INSERT INTO messages (sender, receiver, message)
VALUES ('instructor@app.com', 'student@app.com', 'Welcome to the course.');

INSERT INTO contact (email, message) VALUES
  ('user1@example.com', 'Hello, I have a question about your services.'),
  ('user2@example.com', "Hi there, I'd like to provide some feedback on your website.");

COMMIT;
