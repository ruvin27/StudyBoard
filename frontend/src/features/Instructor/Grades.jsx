import GradesCSS from '@assets/css/Grades.module.css';
import { useAuth } from '@contexts/AuthContext';
import LoadingSpinner from '@features/LoadingSpinner';
import { apiClient } from '@lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import * as React from 'react';

const Grades = () => {
  const { user: instructor } = useAuth();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['exam', { instructorId: instructor.userid }],
    queryFn: async () => {
      const response = await apiClient('/exam/getAllByInstructorId.php', {
        params: {
          id: instructor.userid,
        },
      });

      return response.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  console.log(courses);

  if (courses.data.length === 0) {
    return (
      <div className={GradesCSS.container}>
        <h1>No courses found</h1>
      </div>
    );
  }

  return (
    <>
      {courses.data.map((course) => (
        <React.Fragment key={course.course_id}>
          {course.exams.length > 0 ? (
            <>
              {course.exams.map((exam) => {
                const averageGrade = exam.students.reduce((acc, student) => acc + Number(student.grade_score), 0) / exam.students.length;

                return (
                  <div key={exam.exam_id}>
                    <div className={GradesCSS.container}>
                      <div className={GradesCSS.leftElement}>
                        <h2>
                          {course.course_name} - {exam.exam_title}
                        </h2>
                      </div>
                    </div>

                    <div className={GradesCSS.Grades}>
                      {exam.students.length > 0 ? (
                        <>
                          <table className={GradesCSS.customTable}>
                            <caption>
                              <div
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'end',
                                  marginBottom: '1rem',
                                }}
                              >
                                <strong>Average Grade:</strong>
                                <span>{averageGrade}%</span>
                              </div>
                            </caption>
                            <thead>
                              <tr>
                                <th>Student</th>
                                <th>Grades</th>
                              </tr>
                            </thead>
                            <tbody>
                              {exam.students.map((student) => (
                                <tr key={student.userid}>
                                  <td>{student.student_name}</td>
                                  <td>{student.grade_score}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </>
                      ) : (
                        <p className={GradesCSS.customTable}>No students have taken this exam yet.</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <div className={GradesCSS.container}>
              <div className={GradesCSS.leftElement}>
                <h2>{course.course_name} - No Exams Found</h2>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default Grades;
