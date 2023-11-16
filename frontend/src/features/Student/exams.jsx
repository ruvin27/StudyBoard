import React, { useState, useEffect } from "react";
import ExamsCSS from '@assets/css/Exams.module.css';
import { Link } from "react-router-dom";
import { useAuth } from '@contexts/AuthContext';
import { apiClient } from '@lib/apiClient';
import { useParams } from "react-router-dom";
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'
const StudentExams = () => {
  const { courseId, name } = useParams();
  const { user } = useAuth();
  const [examDetails, setExamDetails] = useState([]); // Initialize with an empty array
  const [gradeCount, setGradeCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
        // Fetch exam details
        const examResponse = await axios.get(`${LARAVEL_BACKEND_URL}/exams/get-by-student-course/${courseId}/${user.userid}`)
        console.log(examResponse.data);

        setExamDetails(examResponse.data);
        let counter = 0;
        for(let i=0; i<examResponse.data.length; i++){
          if (examResponse.data[i].score){
            counter += 1;
          }
        }
        setGradeCount(counter);
        console.log(counter)
      }
    if (user) {
      fetchData();
    }
  }, [courseId, user]);

  return (
    <div>
      <div className={ExamsCSS.container}>
        <div className={ExamsCSS.leftElement}>
          
            <h2>{name}</h2>
        
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
            {examDetails.length === gradeCount ? (
              <tr>
                <td colSpan="2">No upcoming exams to display.</td>
              </tr>
            ) : (
              examDetails.map((exam) => (
                exam.score ? null : (
                  <tr key={exam.exam_id}>
                    <td>{exam.exam_title}</td>
                    <td>
                      <Link to={`/takeExam/${exam.exam_id}/${courseId}`}>
                        <button className={ExamsCSS.customButton}>Take Exam</button>
                      </Link>
                    </td>
                  </tr>)
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
          {gradeCount === 0 ? (
              <tr>
                <td colSpan="2">No grades to display.</td>
              </tr>
            ) : (
              examDetails.map((grade, index) => (
                grade.score && (<tr key={index}>
                  <td>{grade.exam_title}</td>
                  {grade.score && <td>{parseInt(grade.score)}/{parseInt(grade.total)}</td>}
                </tr>)
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentExams;
