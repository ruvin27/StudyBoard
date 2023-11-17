import GradesCSS from '@assets/css/Grades.module.css';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';
import { apiClient } from '@lib/apiClient';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const StudentGrades = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [takeGradeDetails, setGradeDetails] = useState([]);
  const [courseName, setCourseName] = useState('');
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LARAVEL_BACKEND_URL}/exams/get-grades/${courseId}/${user.userid}`);
        setGradeDetails(response.data);

        if (response.data.length > 0) {
          setCourseName(response.data[0].name);
          const scores = response.data.map((gradeDetail) => parseInt(gradeDetail.score));
          const totalScores = response.data.map((gradeDetail) => parseInt(gradeDetail.total));
          const sumOfScores = scores.reduce((total, score) => total + score, 0);
          const sumOfTotalScores = totalScores.reduce((total, totalScore) => total + totalScore, 0);

          const averagePercentage = (sumOfScores / sumOfTotalScores) * 100;
          setOverallScore(averagePercentage);
        }
      } catch (error) {
        console.error('Error fetching grade details:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [courseId, user]);

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`Course: ${courseName}`, 10, 10);
    doc.text('Exam Scores:', 10, 20);

    let yPos = 30;
    takeGradeDetails.forEach((gradeDetail, index) => {
      doc.text(`${gradeDetail.exam_title}: ${gradeDetail.score}%`, 10, yPos);
      yPos += 10;
    });

    doc.save('exam_scores.pdf');
  };

  return (
    <div>
      <div className={GradesCSS.container}>
        <div className={GradesCSS.leftElement}>
          <h2>{courseName}</h2>
        </div>
        <div className={GradesCSS.rightElement}>
          <h2>Overall Score: {overallScore.toFixed(2)}%</h2>
        </div>
      </div>
      <div className={GradesCSS.grades}>
        <table className={GradesCSS.customTable}>
          <thead>
            <tr>
              <th>Exam</th>
              <th>Scores</th>
            </tr>
          </thead>
          <tbody>
            {takeGradeDetails.length === 0 ? (
              <tr>
                <td colSpan="2">No grades available.</td>
              </tr>
            ) : (
              takeGradeDetails.map((gradeDetail, index) => (
                <tr key={index}>
                  <td>{gradeDetail.exam_title}</td>
                  <td>{((gradeDetail.score/gradeDetail.total)*100).toFixed(2)}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className={GradesCSS.reports}>
        <button
          className={GradesCSS.pdfButton}
          onClick={downloadPDF}
          disabled={takeGradeDetails.length === 0}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default StudentGrades;
