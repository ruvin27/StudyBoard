import React, { useState, useEffect } from 'react'
import GradesCSS from '@assets/css/Grades.module.css'
import { apiClient } from '@lib/apiClient'

const BelowAverageResultsPC = () => {
  const [examData, setExamData] = useState([])
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [resolutionStatus, setResolutionStatus] = useState({})

  useEffect(() => {
    const fetchBelowAvgExamsData = () => {
      apiClient
        .get('/PC/belowAvgExams.php').then((res)=> {
          setExamData(res.data);
        })
        .catch((error) => {
          console.error('Error fetching below-average exams data:', error)
        })
    }
    fetchBelowAvgExamsData()
  }, [])

  const resolveExam = (examId, resolvedBy) => {
    setLoading(true)
    apiClient
      .post('/PC/resolveExam.php', { examId, resolvedBy })
      .then((response) => {
        if (response.data.success) {
          const updatedExamData = examData.map((exam) => {
            if (exam.exam_id === examId) {
              const resolvedColumnName = `${resolvedBy.toLowerCase().replace(' ', '_')}_resolved`
              exam[resolvedColumnName] = 1
              setResolutionStatus({
                ...resolutionStatus,
                [examId]: {
                  ...resolutionStatus[examId],
                  [resolvedColumnName]: 1,
                },
              })
            }
            return exam
          })
          setExamData(updatedExamData)
        }
        setFeedback(response.data.message)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error resolving the exam:', error)
        setLoading(false)
      })
  }

  return (
    <div>
      <div className={GradesCSS.container}>
        <div className={GradesCSS.leftElement}>
          <h2>Below Average Results</h2>
        </div>
      </div>
      {loading && <p>Loading...</p>}
      {feedback && <p>{feedback}</p>}
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
                <td>{exam.qa_officer_resolved=== '0' ? 'Not Resolved' : 'Resolved'}</td>
                
                <td>
                  {exam.program_coordinator_resolved === '0' ? (
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
