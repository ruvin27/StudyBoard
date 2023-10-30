import React, { useState, useEffect } from "react";
import ExamsCSS from '@assets/css/Exams.module.css';
import { Link } from "react-router-dom";
import { useAuth } from '@contexts/AuthContext';
import { apiClient } from '@lib/apiClient';
import { useParams } from "react-router-dom";

const StudentExams = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [examDetails, setExamDetails] = useState([]); // Initialize with an empty array
  const [gradeDetails, setGradeDetails] = useState([]); // Initialize with an empty array
  const [courseName, setCourseName] = useState('');

  const [error, setError] = useState(null); // Initialize with null

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch exam details
        const examResponse = await apiClient.post('student/exams.php', {
          courseId: courseId,
          userid: user.userid,
        });
      
        setExamDetails(examResponse.data);
       

        // Fetch grade details
        const gradeResponse = await apiClient.post('student/grades.php', {
          courseId: courseId,
          userId: user.userid,
        });

        setGradeDetails(gradeResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Error fetching data. Please try again later.");
      }
    }

    if (user) {
      fetchData();
    }
  }, [courseId, user]);

  return (
    <div>
      <div className={ExamsCSS.container}>
        <div className={ExamsCSS.leftElement}>
          
            <h2>{examDetails.length > 0 ? examDetails[0].name : 'Course Name'}</h2>
        
        </div>
      </div>
      <br />
      <br />
      <div>
        <table className={ExamsCSS.customTable}>
          <thead>
            <tr>
              <th>Upcoming Exams</th>
              <th>Take Exam</th>
            </tr>
          </thead>
          <tbody>
            {examDetails.length === 0 ? (
              <tr>
                <td colSpan="2">No upcoming exams to display.</td>
              </tr>
            ) : (
              examDetails.map((exam) => (
                <tr key={exam.exam_id}>
                  <td>{exam.exam_title}</td>
                  <td>
                    <Link to={`/takeExam/${exam.exam_id}/${courseId}`}>
                      <button className={ExamsCSS.customButton}>Take Exam</button>
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div>
        <table className={ExamsCSS.customTable}>
          <thead>
            <tr>
              <th>Upcoming Exams</th>
              <th>Grades</th>
            </tr>
          </thead>
          <tbody>
            {gradeDetails.length === 0 ? (
              <tr>
                <td colSpan="2">No grades available.</td>
              </tr>
            ) : (
              gradeDetails.map((grade, index) => (
                <tr key={index}>
                  <td>{grade.exam_title}</td>
                  <td>{grade.score}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentExams;
