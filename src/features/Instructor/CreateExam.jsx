import React from 'react';
import CreateExamCSS from "../../assets/css/CreateExam.module.css";
const CreateExam = () => {
    return(
        <div>
            <div className={CreateExamCSS.container}>
			<div className={CreateExamCSS.leftElement}><h2>Course 1</h2></div>
		</div>
		<div className={CreateExamCSS.examFormContainer}>
			<h3>Create an Exam</h3>
			<form id="examForm">
				<label htmlfor="examName">Exam Name:</label>
				<input type="text" id="examName" name="examName" required /><br /><br />

				<label htmlfor="examDate">Exam Date:</label>
				<input type="date" id="examDate" name="examDate" required /><br /><br />

				<label htmlfor="examScore">Maximum Score:</label>
				<input type="number" id="examScore" name="examScore" required /><br /><br />

				<label htmlfor="examTime">Exam Duration (in minutes):</label>
				<input type="number" id="examTime" name="examTime" required /><br /><br />
			</form>
		</div>

		<div className={CreateExamCSS.questionFormContainer}>
			<h3>Add a Question</h3>
			<form id="questionForm">
				<label htmlfor="questionText">Question:</label>
				<textarea id="questionText" name="questionText" rows="4" required></textarea><br /><br />

				<label htmlfor="option1">Option 1:</label>
				<input type="text" id="option1" name="option1" required /><br /><br />

				<label htmlfor="option2">Option 2:</label>
				<input type="text" id="option2" name="option2" required /><br /><br />

				<label htmlfor="option3">Option 3:</label>
				<input type="text" id="option3" name="option3" required /><br /><br />

				<label htmlfor="option4">Option 4:</label>
				<input type="text" id="option4" name="option4" required /><br /><br />

				<label htmlfor="correctAnswer">Correct Answer (1-4):</label>
				<select id="correctAnswer" name="correctAnswer" required>
					<option value="1">Option 1</option>
					<option value="2">Option 2</option>
					<option value="3">Option 3</option>
					<option value="4">Option 4</option></select
				><br /><br />

				<button type="button" onclick="addQuestion()">Add Question</button>
			</form>
		</div>

		<div className={CreateExamCSS.create}>
			<button className={CreateExamCSS.createButton}>Create Exam</button>
		</div>
		<script src="../../assets/js/nav.js"></script>
        </div>

    );
}
export default CreateExam;
