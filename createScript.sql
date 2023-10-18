-- Create the user table
CREATE TABLE user (
    userid INT  AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL, -- Change the column name to 'email'
    role VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255),
    verification_code text NOT NULL,
    email_verified_at datetime DEFAULT NULL
);

-- Create the program table
CREATE TABLE program (
    program_id INT PRIMARY KEY,
    program_name VARCHAR(255) NOT NULL,
    description TEXT
);

-- Create the course table
CREATE TABLE course (
    course_id INT PRIMARY KEY,
    description TEXT,
    course_name VARCHAR(255) NOT NULL,
    program_id INT,
    instructor_id INT,
    FOREIGN KEY (program_id) REFERENCES program(program_id),
    FOREIGN KEY (instructor_id) REFERENCES user(userid) -- Change to reference the 'email' column
);

-- Create the exam table
CREATE TABLE exam (
    exam_id INT PRIMARY KEY,
    course_id INT,
    date DATE,
    description TEXT,
    score DECIMAL(5, 2),
    exam_title VARCHAR(255),
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Create the question table
CREATE TABLE question (
    question_id INT PRIMARY KEY,
    exam_id INT,
    question TEXT NOT NULL,
    answer VARCHAR(255) NOT NULL,
    mcq1 VARCHAR(255),
    mcq2 VARCHAR(255),
    mcq3 VARCHAR(255),
    mcq4 VARCHAR(255),
    FOREIGN KEY (exam_id) REFERENCES exam(exam_id)
);

-- Create the grades table
CREATE TABLE grades (
    grade_id INT PRIMARY KEY,
    exam_id INT,
    course_id INT,
    student_id INT, -- Change the data type to VARCHAR to match 'email'
    date DATE,
    score DECIMAL(5, 2),
    FOREIGN KEY (exam_id) REFERENCES exam(exam_id),
    FOREIGN KEY (course_id) REFERENCES course(course_id),
    FOREIGN KEY (student_id) REFERENCES user(userid) -- Change to reference the 'email' column
);

-- Create the comments table
CREATE TABLE comments (
    comment_id INT PRIMARY KEY,
    student_id INT, -- Change the data type to VARCHAR to match 'email'
    course_id INT,
    timestamp TIMESTAMP,
    message TEXT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES user(userid), -- Change to reference the 'email' column
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

CREATE TABLE student_enrolls_into_course (
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES user(userid), 
    FOREIGN KEY (course_id) REFERENCES course(course_id)
);

-- Drop all Tables
-- DROP TABLE IF EXISTS comments;
-- DROP TABLE IF EXISTS grades;
-- DROP TABLE IF EXISTS question;
-- DROP TABLE IF EXISTS exam;
-- DROP TABLE IF EXISTS course;
-- DROP TABLE IF EXISTS program;
-- DROP TABLE IF EXISTS user;
