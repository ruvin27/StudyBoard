
import React, { useState, useEffect } from "react";
import MyCoursesCSS from "../../assets/css/MyCourses.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from '@contexts/AuthContext'
import { apiClient } from '@lib/apiClient'

const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // try {
      //   const response = await axios.post(`http://localhost/backend/src/student/myCourses.php`, {
      //       userid: user.userid,
      //   });
      //   console.log(response.data)
      //   setCourses(response.data);
      // } catch (error) {
      //   console.error("Error fetching courses:", error);
      // }
      await apiClient
    .post('/student/myCourses.php', {
      userid: user.userid
  })
    .then(async (res) => {
      if (res.data === 'error') {
        alert(res.data.message)
        return
      }
        setCourses(res.data);

    })
    };
    if(user){
      fetchData();
    }
      
  }, [user]);

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
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        {courses.length > 0 ? (
          courses.map((course, index) => (
            <Link to={`/CourseInfoNavigation/${course.course_id}`} key={index}>
         
              <div className={MyCoursesCSS.courseCard}>
                <div className={MyCoursesCSS.courseInfo}>
                  <h2 className={MyCoursesCSS.courseTitle}>{course.name}</h2>
                  <p className={MyCoursesCSS.courseDescription}>{course.course_desc}</p>
                  <div className={MyCoursesCSS.courseMeta}>
                    <p className={MyCoursesCSS.courseInstructor}>Instructor: {course.instructor_name}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No courses enrolled.</p>
        )}
      </div>
    </>
  );
};

export default StudentDashboard;

