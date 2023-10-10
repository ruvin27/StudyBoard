import React from "react"
import TakeExamCSS from "../../assets/css/takeexam.module.css"

export default function StudentTakeExam() {
  return (
    <>
      <div className={TakeExamCSS.container}>
        <div className={TakeExamCSS.leftElement}>
          <h2>Exam 1</h2>
        </div>
      </div>
      <div className={TakeExamCSS.formContainer}>
        <div className={TakeExamCSS.quizCard} id="question1">
          <h3>Question 1:</h3>
          <p>What is the capital of France?</p>

          <label>
            <input type="radio" name="answer1" value="paris" /> Paris
          </label>
          <label>
            <input type="radio" name="answer1" value="london" /> London
          </label>
          <label>
            <input type="radio" name="answer1" value="berlin" /> Berlin
          </label>
          <label>
            <input type="radio" name="answer1" value="madrid" /> Madrid
          </label>
        </div>

        <div className={TakeExamCSS.quizCard} id="question2">
          <h3>Question 2:</h3>
          <p>Which planet is known as the Red Planet?</p>

          <label>
            <input type="radio" name="answer2" value="mars" /> Mars
          </label>
          <label>
            <input type="radio" name="answer2" value="venus" /> Venus
          </label>
          <label>
            <input type="radio" name="answer2" value="jupiter" /> Jupiter
          </label>
          <label>
            <input type="radio" name="answer2" value="earth" /> Earth
          </label>
        </div>

        <div className={TakeExamCSS.submit}>
          <button type="submit" className={TakeExamCSS.submitQuiz}>
            Submit Quiz
          </button>
        </div>
      </div>
    </>
  )
}
