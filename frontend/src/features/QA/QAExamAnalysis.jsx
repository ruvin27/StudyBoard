import React, { useState, useEffect } from 'react';
import ReportsCSS from '../../assets/css/Reports.module.css';
import { apiClient } from '@lib/apiClient';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';
import { Link } from 'react-router-dom';

const QAExamAnalysis = () => {
  const [examTitles, setExamTitles] = useState([]);
  const [studentNames, setStudentNames] = useState([]);
  const { courseId } = useParams();

  useEffect(() => {
    fetchExamTitles();
    fetchStudentNames();
  }, [courseId]);

  const fetchExamTitles = () => {
    axios
      .get(`${LARAVEL_BACKEND_URL}/exams/getAllByCourseId/${courseId}`)
      .then((response) => {
        setExamTitles(response.data.data.exams);
      })
      .catch((error) => {
        console.error('Error fetching exam titles:', error);
      });
  };

  const fetchStudentNames = () => {
    axios
      .get(`${LARAVEL_BACKEND_URL}/get-students-by-course/${courseId}`)
      .then((response) => {
        setStudentNames(response.data);
      })
      .catch((error) => {
        console.error('Error fetching student names:', error);
      });
  };

  const downloadExamData = (exam_id) => {
    window.location.href = `${LARAVEL_BACKEND_URL}/download-grades-by-exam/${courseId}/${exam_id}`;
  };

  const downloadStudentData = (userid) => {
    window.location.href = `${LARAVEL_BACKEND_URL}/download-grades-by-student/${userid}/${courseId}`;
  };

  return (
    <div>
      <div className={ReportsCSS.container}>
        <div className={ReportsCSS.leftElement}>
          <h2>Course Name</h2>
        </div>
      </div>

      <div className={ReportsCSS.tableContainer}>
        <table className={ReportsCSS.table}>
          <thead>
            <tr>
              <th colSpan="2">Exam Analysis</th>
            </tr>
          </thead>
          <tbody>
            {examTitles.length > 0 ? (
              examTitles.map((exam, index) => (
                <tr key={index}>
                  <td>{exam.exam_title}</td>
                  <td>
                    {/* <button className={ReportsCSS.downloadIcon} onClick={() => downloadExamData(exam.exam_id)}>
                      &#x1F4E5;
                    </button> */}
                    <Link to={`/examresultgraph/${exam.exam_id}/${exam.exam_title}`}>
                      <button className={ReportsCSS.downloadIcon}>&#x1F4CA;</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No exam titles available</td>
              </tr>
            )}
          </tbody>
        </table>

        <table className={ReportsCSS.table}>
          <thead>
            <tr>
              <th colSpan="2">Student Reports</th>
            </tr>
          </thead>
          <tbody>
            {studentNames.length > 0 ? (
              studentNames.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>
                    <button className={ReportsCSS.downloadIcon} onClick={() => downloadStudentData(student.userid)}>
                      &#x1F4E5;
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No student names available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QAExamAnalysis;
