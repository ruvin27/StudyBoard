import myCoursesCSS from '@assets/css/MyCourses.module.css';
import { useAuth } from '@contexts/AuthContext';
import LoadingSpinner from '@features/LoadingSpinner';
import { apiClient } from '@lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';
const MyCourses = () => {
  const { user: instructor } = useAuth();

  const {
    data: courses,
    isLoading,
    isPaused,
  } = useQuery({
    queryKey: ['courses', { instructorId: instructor.id }],
    queryFn: async () => {
      const response = await axios.get(`${LARAVEL_BACKEND_URL}/courses/getAllByInstructorId/${instructor.userid}`);

      return response.data;
    },
    enabled: !!instructor,
  });

  if (isLoading || isPaused) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className={myCoursesCSS.container}>
        <div className={myCoursesCSS.leftElement}>
          <h2>My Courses</h2>
        </div>
        <div className={myCoursesCSS.rightElement}>
          <Link to="/createCourse">
            <button className={myCoursesCSS.mycoursesButton}>Create Course</button>
          </Link>
          <Link to="/">
            <button className={myCoursesCSS.mycoursesButton}>Program Details</button>
          </Link>
        </div>
      </div>
      <div className={myCoursesCSS.courses}>
        {courses?.data.length > 0 ? (
          courses.data.map((course) => (
            <Link to={`/InstructorCourseInfo?courseId=${course.course_id}`} key={course.course_id}>
              <div className={myCoursesCSS.courseCard}>
                <div className={myCoursesCSS.courseInfo}>
                  <h2 className={myCoursesCSS.courseTitle}>{course.course_name}</h2>
                  <p className={myCoursesCSS.courseDescription}>{course.course_description}</p>
                  <div className={myCoursesCSS.courseMeta}>
                    <p className={myCoursesCSS.courseInstructor}>Students: {course.students.length}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};
export default MyCourses;
