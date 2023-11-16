import GradesCSS from '@assets/css/Grades.module.css';
import { useAuth } from '@contexts/AuthContext';
import { apiClient } from '@lib/apiClient';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';

const ContactUsResponses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${LARAVEL_BACKEND_URL}/get-contact-responses`);
        setResponses(response.data.data);
      } catch (error) {
        console.error('Error fetching contact responses:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className={GradesCSS.container}>
        <div className={GradesCSS.leftElement}>
          <h2>Contact Us Responses</h2>
        </div>
      </div>
      <div className={GradesCSS.grades}>
        <table className={GradesCSS.customTable}>
          <thead>
            <tr>
              <th>Email</th>
              <th>Date</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td>{response.email}</td>
                <td>{response.date}</td>
                <td>{response.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUsResponses;
