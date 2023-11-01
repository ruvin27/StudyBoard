DROP TABLE IF EXISTS user_activity;
DROP TABLE IF EXISTS contact;
DROP TABLE IF EXISTS enrollment;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS question;
DROP TABLE IF EXISTS objectives;
DROP TABLE IF EXISTS recommendation;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS exam_resolution;
DROP TABLE IF EXISTS exam;
DROP TABLE IF EXISTS course;
DROP TABLE IF EXISTS program;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS qa_policies;
DROP TABLE IF EXISTS ColorTable;


-- Create the user table
CREATE TABLE user
(
    userid            INT AUTO_INCREMENT PRIMARY KEY,
    email             VARCHAR(255) UNIQUE NOT NULL,
    role              VARCHAR(255)        NOT NULL,
    name              VARCHAR(255)        NOT NULL,
    password          VARCHAR(255)        NOT NULL,
    phone_number      VARCHAR(255),
    verification_code text                NOT NULL,
    email_verified_at datetime DEFAULT NULL
);

-- Create the program table
CREATE TABLE program
(
    program_id   INT PRIMARY KEY AUTO_INCREMENT,
    program_name VARCHAR(255) NOT NULL,
    description  TEXT
);

-- Create the course table
CREATE TABLE course
(
    course_id     INT PRIMARY KEY AUTO_INCREMENT,
    description   TEXT,
    name          VARCHAR(255) NOT NULL,
    code          VARCHAR(255) NOT NULL,
    start_date    DATE         NOT NULL,
    end_date      DATE         NOT NULL,
    objective     TEXT,
    program_id    INT,
    instructor_id INT,
    FOREIGN KEY (program_id) REFERENCES program (program_id) ON DELETE CASCADE,
    FOREIGN KEY (instructor_id) REFERENCES user (userid) ON DELETE CASCADE
);

-- Create the exam table
CREATE TABLE exam
(
    exam_id       INT PRIMARY KEY AUTO_INCREMENT,
    course_id     INT,
    date          DATE,
    description   TEXT,
    score         DECIMAL(5, 2),
    exam_duration INT,
    exam_title    VARCHAR(255),
    FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE CASCADE
);

-- Create the question table
CREATE TABLE question
(
    question_id INT PRIMARY KEY AUTO_INCREMENT,
    exam_id     INT,
    question    TEXT         NOT NULL,
    answer      VARCHAR(255) NOT NULL,
    mcq1        VARCHAR(255),
    mcq2        VARCHAR(255),
    mcq3        VARCHAR(255),
    mcq4        VARCHAR(255),
    FOREIGN KEY (exam_id) REFERENCES exam (exam_id) ON DELETE CASCADE
);

-- Create the grades table
CREATE TABLE grades
(
    grade_id   INT PRIMARY KEY AUTO_INCREMENT,
    exam_id    INT,
     course_id  INT,
    student_id INT,
    date       DATE,
    score      DECIMAL(5, 2),
    FOREIGN KEY (exam_id) REFERENCES exam (exam_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES user (userid) ON DELETE CASCADE
);

-- Create the comments table
CREATE TABLE comments
(
    comment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id  INT,
    timestamp  TIMESTAMP,
    message    TEXT NOT NULL,
    FOREIGN KEY (student_id) REFERENCES user (userid) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE CASCADE
);

CREATE TABLE enrollment
(
    student_id INT,
    course_id  INT,
    FOREIGN KEY (student_id) REFERENCES user (userid) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE CASCADE
);

CREATE TABLE messages
(
    ID       INT AUTO_INCREMENT PRIMARY KEY,
    sender   TEXT,
    receiver TEXT,
    message  TEXT
);

CREATE TABLE exam_resolution
(
    resolution_id                INT PRIMARY KEY AUTO_INCREMENT,
    exam_id                      INT,
    qa_officer_resolved          INT,
    program_coordinator_resolved INT,
    FOREIGN KEY (exam_id) REFERENCES exam (exam_id) ON DELETE CASCADE
);

CREATE TABLE qa_policies
(
    id       INT AUTO_INCREMENT PRIMARY KEY,
    policies TEXT
);

CREATE TABLE ColorTable
(
    id          INT AUTO_INCREMENT PRIMARY KEY,
    usedFor     VARCHAR(255) NOT NULL,
    hexColor    VARCHAR(7)   NOT NULL,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE objectives
(
    objective_id INT AUTO_INCREMENT PRIMARY KEY,
    program_id   INT,
    objective    TEXT,
    FOREIGN KEY (program_id) REFERENCES program (program_id) ON DELETE CASCADE
);

CREATE TABLE recommendation
(
    recommendation_id INT AUTO_INCREMENT PRIMARY KEY,
    course_id         INT           NOT NULL,
    message           varchar(1000) NOT NULL,
    sender_id         INT           NOT NULL,

    FOREIGN KEY (course_id) REFERENCES course (course_id) ON DELETE CASCADE,
    FOREIGN KEY (sender_id) REFERENCES user (userid) ON DELETE CASCADE
);

CREATE TABLE contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE user_activity (
  user_activity_id int(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
  User_email varchar(50) NOT NULL,
  Role varchar(50) NOT NULL,
  Last_logged_in timestamp NOT NULL DEFAULT current_timestamp()
);