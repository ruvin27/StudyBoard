import MyCoursesCSS from '@assets/css/MyCourses.module.css';
import LoadingSpinner from '@features/LoadingSpinner';
import { apiClient } from '@lib/apiClient';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { useAuth } from '@contexts/AuthContext';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';
const MyCoursesPc = () => {
  const { user: pc } = useAuth();

  const {
    data: courses,
    isLoading,
    isPaused,
  } = useQuery({
    queryKey: ['courses', { PCId: pc.id }],
    queryFn: async () => {
      const response = await axios.get(`${LARAVEL_BACKEND_URL}/get-all-courses`);
      return response.data;
    },
    enabled: !!pc,
  });

  if (isLoading || isPaused) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      <div className={MyCoursesCSS.container}>
        <div className={MyCoursesCSS.leftElement}>
          <h2>My Courses</h2>
        </div>
        <div className={MyCoursesCSS.rightElement}>
          <Link to={'/contactusresponses'}>
            <button className={MyCoursesCSS.mycoursesButton}>Contact Responses</button>
          </Link>
          <Link to={'/pcobjectives'}>
            <button className={MyCoursesCSS.mycoursesButton}>Program Objectives</button>
          </Link>
          <Link to={'/belowavgexamspc'}>
            <button className={MyCoursesCSS.mycoursesButton}>Below Average Results</button>
          </Link>
          <Link to={'/'}>
            <button className={MyCoursesCSS.mycoursesButton}>Program Details</button>
          </Link>
        </div>
      </div>
      <div className={MyCoursesCSS.courses}>
        {courses?.data.length > 0 ? (
          courses.data.map((course) => (
            <Link to={`/PCCourseInfo?courseId=${course.course_id}`} key={course.course_id}>
              <div className={MyCoursesCSS.courseCard}>
                <div className={MyCoursesCSS.courseInfo}>
                  <h2 className={MyCoursesCSS.courseTitle}>{course.course_name}</h2>
                  <p className={MyCoursesCSS.courseDescription}>{course.course_description}</p>
                  <div className={MyCoursesCSS.courseMeta}>
                    <p className={MyCoursesCSS.courseInstructor}>Students: {course.students.length}</p>
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

export default MyCoursesPc;
