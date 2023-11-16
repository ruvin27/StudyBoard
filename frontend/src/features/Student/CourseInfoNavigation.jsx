import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import CouseInfoCSS from '@assets/css/CourseInfo.module.css';
import axios from 'axios';
import { useAuth } from '@contexts/AuthContext';
import { apiClient } from '@lib/apiClient';
import { LARAVEL_BACKEND_URL } from '../../config';

const CourseInfoNavigation = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LARAVEL_BACKEND_URL}/courses/getCourseById/${courseId}`);
        setCourseDetails(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [courseId, user]);

  return (
    <>
      {courseDetails ? (
        <>
          <div className={CouseInfoCSS.container}>
            <div className={CouseInfoCSS.leftElement}>
              <h2>{courseDetails.data.course_name}</h2>
            </div>
            <div className={CouseInfoCSS.rightElement}>
              <Link to={`/people/${courseDetails.data.course_id}`}>
                {' '}
                {/* Include courseId in the URL */}
                <button className={CouseInfoCSS.button}>People</button>
              </Link>
            </div>
          </div>
          <div>
            <Link to="/Syllabus.pdf" target="_blank">
              <button className={CouseInfoCSS.button}>Syllabus</button>
            </Link>

            <Link to={`/studentExams/${courseDetails.data.course_id}/${courseDetails.data.course_name}`}>
              <button className={CouseInfoCSS.button}>Exams</button>
            </Link>
            <Link to={`/student-grades/${courseDetails.data.course_id}`}>
              <button className={CouseInfoCSS.button}>Grades</button>
            </Link>
          </div>
          <div className={CouseInfoCSS.CourseInformation} style={{ height: '380px' }}>
            <p>
              <strong>Course Code:</strong> {courseDetails.data.course_code}
            </p>
            <p>
              <strong>Course Name:</strong> {courseDetails.data.course_name}
            </p>
            <p>
              <strong>Course Instructor:</strong> {courseDetails.data.instructor.name}
            </p>
            <p>
              <strong>Course Description:</strong> {courseDetails.data.course_description}
            </p>
            <p>
              <strong>Course Start Date:</strong> {courseDetails.data.course_start_date}
            </p>
            <p>
              <strong>Course End Date:</strong> {courseDetails.data.course_end_date}
            </p>

            <p>
              <strong>Students:</strong> {courseDetails.data.students.length}
            </p>
          </div>
        </>
      ) : (
        <p>Loading course details...</p>
      )}
    </>
  );
};

export default CourseInfoNavigation;
