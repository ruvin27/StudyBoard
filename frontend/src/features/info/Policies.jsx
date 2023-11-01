import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgramCSS from '@assets/css/program.module.css';
import QAPoliciesCSS from '@assets/css/courses.module.css';
import { apiClient } from '@lib/apiClient';
import TextEditCSS from '@assets/css/QAPolicies.module.css';

const Policies = () => {
  const [policies, setPolicies] = useState('');

  useEffect(() => {
    // Fetch QA Policies from the backend when the component mounts
    fetchQAPolicies();
  }, []);

  const fetchQAPolicies = () => {
    apiClient.get('QA/QAPolicies.php') // Adjust the URL
      .then((response) => {
        setPolicies(response.data.policies);
      })
      .catch((error) => {
        console.error('Error fetching QA Policies:', error);
      });
  };

  return (
    <div className={ProgramCSS.container}>
      <div className={ProgramCSS.programDetails}>
        <div className={ProgramCSS.contentHeader}>
          <h1>QA Processes and Policies</h1>
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
