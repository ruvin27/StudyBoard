// import React from "react"
// import MyCoursesCSS from "../../assets/css/MyCourses.module.css"
// import { Link } from "react-router-dom"

// export default function StudentMyCourses() {
//   return (
//     <>
//       <div className={MyCoursesCSS.container}>
//         <div className={MyCoursesCSS.leftElement}>
//           <h2>My Courses</h2>
//         </div>
//         <div className={MyCoursesCSS.rightElement}>
//           <Link to="/">
//             <button className={MyCoursesCSS.mycoursesButton}>
//               Program Details
//             </button>
//           </Link>
//         </div>
//       </div>
//       <div className={MyCoursesCSS.courses}>
//         <Link to="/CourseInfoNavigation">
//           <div className={MyCoursesCSS.courseCard}>
//             <div className={MyCoursesCSS.courseInfo}>
//               <h2 className={MyCoursesCSS.courseTitle}>Course Title 1</h2>
//               <p className={MyCoursesCSS.courseDescription}>
//                 This is a brief description of the first course.
//               </p>
//               <div className={MyCoursesCSS.courseMeta}>
//                 <p className={MyCoursesCSS.courseInstructor}>
//                   Instructor: John Do
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Link>
//         <Link to="/CourseInfoNavigation">
//           <div className={MyCoursesCSS.courseCard}>
//             <div className={MyCoursesCSS.courseInfo}>
//               <h2 className={MyCoursesCSS.courseTitle}>Course Title 2</h2>
//               <p className={MyCoursesCSS.courseDescription}>
//                 This is a brief description of the second course.
//               </p>
//               <div className={MyCoursesCSS.courseMeta}>
//                 <p className={MyCoursesCSS.courseInstructor}>
//                   Instructor: Jane Smith
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Link>
//         <Link to="/CourseInfoNavigation">
//           <div className={MyCoursesCSS.courseCard}>
//             <div className={MyCoursesCSS.courseInfo}>
//               <h2 className={MyCoursesCSS.courseTitle}>Course Title 3</h2>
//               <p className={MyCoursesCSS.courseDescription}>
//                 This is a brief description of the second course.
//               </p>
//               <div className={MyCoursesCSS.courseMeta}>
//                 <p className={MyCoursesCSS.courseInstructor}>
//                   Instructor: Jane Smith
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Link>
//         <Link to="/CourseInfoNavigation">
//           <div className={MyCoursesCSS.courseCard}>
//             <div className={MyCoursesCSS.courseInfo}>
//               <h2 className={MyCoursesCSS.courseTitle}>Course Title 4</h2>
//               <p className={MyCoursesCSS.courseDescription}>
//                 This is a brief description of the second course.
//               </p>
//               <div className={MyCoursesCSS.courseMeta}>
//                 <p className={MyCoursesCSS.courseInstructor}>
//                   Instructor: Jane Smith
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Link>
//         <Link to="/CourseInfoNavigation">
//           <div className={MyCoursesCSS.courseCard}>
//             <div className={MyCoursesCSS.courseInfo}>
//               <h2 className={MyCoursesCSS.courseTitle}>Course Title 4</h2>
//               <p className={MyCoursesCSS.courseDescription}>
//                 This is a brief description of the second course.
//               </p>
//               <div className={MyCoursesCSS.courseMeta}>
//                 <p className={MyCoursesCSS.courseInstructor}>
//                   Instructor: Jane Smith
//                 </p>
//               </div>
//             </div>
//           </div>
//         </Link>
//       </div>
//     </>
//   )
// }







import React, { useState, useEffect } from "react";
import MyCoursesCSS from "../../assets/css/MyCourses.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../AuthContext";
import apiUrl from "../../Config";

const StudentDashboard = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`${apiUrl}backend/student/myCourses.php`, {
            userid: user.userid,
        });
        setCourses(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
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
          <Link to="/program_details">
            <button className={MyCoursesCSS.mycoursesButton}>Program Details</button>
          </Link>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <Link to="/CourseInfoNavigation/${course.course_id}" key={course.course_id}>
         
              <div className={MyCoursesCSS.courseCard}>
                <div className={MyCoursesCSS.courseInfo}>
                  <h2 className={MyCoursesCSS.courseTitle}>{course.course_name}</h2>
                  <p className={MyCoursesCSS.courseDescription}>{course.course_desc}</p>
                  <div className={MyCoursesCSS.courseMeta}>
                    <p className={MyCoursesCSS.courseInstructor}>Instructor: {course.instr_id}</p>
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

