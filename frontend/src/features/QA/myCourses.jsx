
import React, { useState, useEffect } from "react";
import MyCoursesCSS from "../../assets/css/MyCourses.module.css";
import { Link } from "react-router-dom";
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@lib/apiClient'
import LoadingSpinner from "@features/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";

const MyCoursesQA = () => {
  const { user: qa } = useAuth()

  const {
    data: courses,
    isLoading,
    isPaused,
  } = useQuery({
    queryKey: ['courses', { QAId: qa.id }],
    queryFn: async () => {
      const response = await apiClient('/course/getAll.php')

      return response.data
    },
    enabled: !!qa,
  })

  if (isLoading || isPaused) {
    return <LoadingSpinner />
  }
  return (
    <>
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS.leftElement}>
          <h2>My Courses</h2>
        </div>
        <div className={MyCoursesCSS.rightElement}>
          <Link to="/">
            <button className={MyCoursesCSS.mycoursesButton}>Program Details</button>
          </Link>
          <Link to="/belowavgexamsqa"> {/* Add the "Below Average Exams" button */}
            <button className={MyCoursesCSS.mycoursesButton}>Below Average Exams</button>
          </Link>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
      {courses?.data.length > 0 ? (
          courses.data.map((course,index) => (
            <Link
              to={`/courseinfoqa/${course.course_id}`}
              key={index}
            >
              <div className={MyCoursesCSS.courseCard}>
                <div className={MyCoursesCSS.courseInfo}>
                  <h2 className={MyCoursesCSS.courseTitle}>
                    {course.course_name}
                  </h2>
                  <p className={MyCoursesCSS.courseDescription}>
                    {course.course_description}
                  </p>
                  <div className={MyCoursesCSS.courseMeta}>
                    <p className={MyCoursesCSS.courseInstructor}>
                      Students: {course.students.length}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No courses found.</p>
        )}
        </div>
    </>
  );
};

export default MyCoursesQA;