import React, { useState, useEffect } from "react";
import ReportsCSS from "../../assets/css/Reports.module.css";
import { useAuth } from "@contexts/AuthContext";
import { apiClient } from "@lib/apiClient";
import { useParams } from "react-router-dom"; // Import useParams to get the courseId

const QAExamAnalysis = () => {
  const [examTitles, setExamTitles] = useState([]);
  const [studentNames, setStudentNames] = useState([]);
  const { courseId } = useParams(); // Get courseId from the URL

  useEffect(() => {
    // Fetch exam titles and student names from the API when the component mounts
    fetchExamTitles();
    fetchStudentNames();
  }, [courseId]);

  const fetchExamTitles = () => {
    apiClient
      .get(`/QA/getExamTitles.php?courseId=${courseId}`) // Pass courseId as a query parameter
      .then((response) => {
        setExamTitles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching exam titles:", error);
      });
  };

  const fetchStudentNames = () => {
    apiClient
      .get(`/QA/getStudentNames.php?courseId=${courseId}`) // Pass courseId as a query parameter
      .then((response) => {
        setStudentNames(response.data);
        console.log("Fetched student names:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching student names:", error);
      });
  };

  const downloadExamData = (examTitle) => {
    // Make an API call to download exam data for the selected exam title and courseId
    window.location.href = `${apiClient.defaults.baseURL}/QA/downloadExamData.php?exam_title=${examTitle}&courseId=${courseId}`;
  };

  const downloadStudentData = (studentName) => {
    // Make an API call to download student data for the selected student name and courseId
    window.location.href = `${apiClient.defaults.baseURL}/QA/downloadStudentData.php?name=${studentName}&courseId=${courseId}`;
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
              examTitles.map((examTitle) => (
                <tr key={examTitle}>
                  <td>{examTitle}</td>
                  <td>
                    <button
                      className={ReportsCSS.downloadIcon}
                      onClick={() => downloadExamData(examTitle)}
                    >
                      &#x1F4E5;
                    </button>
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
              studentNames.map((studentName) => (
                <tr key={studentName}>
                  <td>{studentName}</td>
                  <td>
                    <button
                      className={ReportsCSS.downloadIcon}
                      onClick={() => downloadStudentData(studentName)}
                    >
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
