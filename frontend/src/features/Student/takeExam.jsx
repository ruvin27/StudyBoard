import React, { useState, useEffect } from "react";
import TakeExamCSS from '@assets/css/takeexam.module.css';
import { useAuth } from '@contexts/AuthContext';
import { apiClient } from '@lib/apiClient';
import { useParams } from "react-router-dom";

const StudentTakeExam = () => {
  const { examId } = useParams();
  const { courseId } = useParams();
  const { user } = useAuth();
  const [takeExamDetails, setTakeExamDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [answers, setAnswers] = useState([]); // Store user's answers
  const [earnedPoints, setEarnedPoints] = useState(null); // Store earned points
  const [totalPoints, setTotalPoints] = useState(0); // Store total points

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.post('student/takeExam.php', {
          examId: examId,
          courseId: courseId
        });

        setTakeExamDetails(response.data);
        setTotalPoints(response.data.length); // Set the total points
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching exam details:', error);
        setIsLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [examId, courseId, user]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = selectedOption;
    setAnswers(updatedAnswers);
  };

  // const handleQuizSubmit = () => {
  //   // Calculate earned points by comparing answers
  //   let earnedPoints = 0;
  //   for (let i = 0; i < totalPoints; i++) {
  //     if (answers[i] === takeExamDetails[i].answer) {
  //       earnedPoints++;
  //     }
  //   }
  //   setEarnedPoints(earnedPoints);
  // };
  const handleQuizSubmit = () => {
    // Calculate earned points by comparing answers
    let earnedPoints = 0;
    for (let i = 0; i < totalPoints; i++) {
      if (answers[i] === takeExamDetails[i].answer) {
        earnedPoints++;
      }
    }
    setEarnedPoints(earnedPoints);

    apiClient
      .post('student/saveGrade.php', {
        studentId: user.userid,
        examId: examId,
        courseId: courseId,
        score: earnedPoints, // Include the earned points in the data
      })
      .then((response) => {
        console.log('Grade saved successfully:', response.data);

      })
      .catch((error) => {
        console.error('Error saving grade:', error);
      });
  };
  
  // console.log(courseId, examId, earnedPoints, user.userid)

  return (
    <div className={TakeExamCSS.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : takeExamDetails.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        <div className={TakeExamCSS.formContainer}>
          {takeExamDetails.map((question, index) => (
            <div key={index} className={TakeExamCSS.quizCard} id={`question${index + 1}`}>
              <h3>Question {index + 1}:</h3>
              <p>{question.question}</p>
              <label>
                <input
                  type="radio"
                  name={`answer${index + 1}`}
                  value={question.mcq1}
                  onChange={() => handleAnswerChange(index, question.mcq1)}
                /> {question.mcq1}
              </label>
              <label>
                <input
                  type="radio"
                  name={`answer${index + 1}`}
                  value={question.mcq2}
                  onChange={() => handleAnswerChange(index, question.mcq2)}
                /> {question.mcq2}
              </label>
              <label>
                <input
                  type="radio"
                  name={`answer${index + 1}`}
                  value={question.mcq3}
                  onChange={() => handleAnswerChange(index, question.mcq3)}
                /> {question.mcq3}
              </label>
              <label>
                <input
                  type="radio"
                  name={`answer${index + 1}`}
                  value={question.mcq4}
                  onChange={() => handleAnswerChange(index, question.mcq4)}
                /> {question.mcq4}
              </label>
            </div>
          ))}
          <div className={TakeExamCSS.submit}>
            <button type="submit" className={TakeExamCSS.submitQuiz} onClick={handleQuizSubmit}>
              Submit Quiz
            </button>
          </div>
          {earnedPoints !== null && (
            <p>
              Earned Points: {earnedPoints} / Total Points: {totalPoints}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentTakeExam;


