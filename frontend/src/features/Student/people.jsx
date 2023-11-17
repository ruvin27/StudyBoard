
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PeopleCSS from '@assets/css/NewUser.module.css';
import { useAuth } from '@contexts/AuthContext';
import { apiClient } from '@lib/apiClient';
import axios from "axios";
import { LARAVEL_BACKEND_URL } from '../../config'

const StudentPeople = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [peopleDetails, setPeopleDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
        .get(`${LARAVEL_BACKEND_URL}/get-people-details/${courseId}`)

        setPeopleDetails(response.data);
      
      } catch (error) {
        console.error('Error fetching people details:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [courseId, user]);

  return (
    <>
      {peopleDetails.length > 0 ? (
        
        <>
          <div className={PeopleCSS.container}>
            <div className={PeopleCSS.leftElement}>
              <h2>{peopleDetails[peopleDetails.length-1].courseName}</h2>
            </div>
          </div>

          <div>
            <table className={PeopleCSS.newUsersTable}>
              <thead>
                <tr>
                  <th colSpan="3">People</th>
                </tr>
                <tr>
                  <th>Role</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {peopleDetails.map((student, index) => (
                  <tr key={index}>
                    <td>{student.role}</td>
                    <td>{student.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <p>No people found for this course.</p>
      )}
    </>
  );
};

export default StudentPeople;

