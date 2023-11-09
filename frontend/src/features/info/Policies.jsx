import React, { useState, useEffect } from 'react';
import ProgramCSS from '@assets/css/program.module.css';
import { apiClient } from '@lib/apiClient';
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'
const Policies = () => {
  const [policies, setPolicies] = useState('');

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = () => {
    axios.get(`${LARAVEL_BACKEND_URL}/get-policies`)
      .then((response) => {
        setPolicies(response.data.data.policies);
      })
      .catch((error) => {
        console.error('Error fetching QA Policies:', error);
      });
  };

  return (
    <div className={ProgramCSS.container}>
      <div className={ProgramCSS.programDetails}>
        <div className={ProgramCSS.contentHeader}>
          <h1>Program Processes and Policies</h1>
        </div>
        <ul>
          {policies.split('\n\n').map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
          }
export default Policies;
