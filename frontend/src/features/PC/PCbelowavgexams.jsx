import React, { useState, useEffect } from 'react'
import GradesCSS from '@assets/css/Grades.module.css'
import { apiClient } from '@lib/apiClient'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const BelowAverageResultsPC = () => {
  const [examData, setExamData] = useState([])

  useEffect(() => {
    fetchBelowAvgExamsData()
  }, [])

  const fetchBelowAvgExamsData = () => {
    axios.get(`${LARAVEL_BACKEND_URL}/get-below-avg-exams`).then((res)=> {
        setExamData(res.data);
      })
      .catch((error) => {
        console.error('Error fetching below-average exams data:', error)
      })
  }

  const resolveExam = (examId, resolvedBy) => {
    axios.put(`${LARAVEL_BACKEND_URL}/resolve-below-avg-exams`, { examId, resolvedBy })
      .then((response) => {
        if (response.data.success) {
          fetchBelowAvgExamsData();
        }
        else{
          console.log(response.data)
        }

      })
      .catch((error) => {
        console.error('Error resolving the exam:', error)
      })
  }

  return (
    <div>
      <div className={GradesCSS.container}>
        <div className={GradesCSS.leftElement}>
          <h2>Below Average Results</h2>
        </div>
      </div>
      <div className={GradesCSS.grades}>
        <table className={GradesCSS.customTable}>
          <thead>
            <tr>
              <th>Course</th>
              <th>Exam</th>
              <th>Class Average</th>
              <th>Total</th>
              <th>QA Officer</th>
              <th>Program Coordinator</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((exam) => (
              <tr key={exam.exam_id}>
                <td>{exam.name}</td>
                <td>{exam.exam_title}</td>
                <td>{exam.avg_score}</td>
                <td>{exam.total}</td>
                <td>{parseInt(exam.qa_officer_resolved)=== 0 ? 'Not Resolved' : 'Resolved'}</td>
                
                <td>
                  {parseInt(exam.program_coordinator_resolved) === 0 ? (
                    <button className={GradesCSS.resolveButton} onClick={() => resolveExam(exam.exam_id, 'Program Coordinator')}>
                      Resolve
                    </button>
                  ) : (
                    'Resolved'
                  )}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BelowAverageResultsPC;
