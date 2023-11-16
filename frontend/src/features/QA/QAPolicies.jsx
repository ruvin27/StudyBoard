import React, { useState, useEffect } from 'react';
import ProgramCSS from '@assets/css/program.module.css';
import QAPoliciesCSS from '@assets/css/courses.module.css';
import { apiClient } from '@lib/apiClient';
import TextEditCSS from '@assets/css/QAPolicies.module.css';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';

const QAPolicies = () => {
  const [policies, setPolicies] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchPolicies();
  }, []);

  const fetchPolicies = () => {
    axios
      .get(`${LARAVEL_BACKEND_URL}/get-policies`)
      .then((response) => {
        setPolicies(response.data.data.policies);
      })
      .catch((error) => {
        console.error('Error fetching QA Policies:', error);
      });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Make an API call to save the edited policies to the backend
    axios
      .put(`${LARAVEL_BACKEND_URL}/update-policies`, { policies }) // Adjust the URL
      .then((response) => {
        console.log(response.data);
        setIsEditing(false);
      })
      .catch((error) => {
        console.error('Error saving QA Policies:', error);
      });
  };

  return (
    <div className={ProgramCSS.container}>
      <div className={ProgramCSS.programDetails}>
        <div className={ProgramCSS.contentHeader}>
          <h1>QA Processes and Policies</h1>
        </div>
        <ul>
          {isEditing ? (
            <textarea className={TextEditCSS.editPolicies} value={policies} onChange={(e) => setPolicies(e.target.value)}></textarea>
          ) : (
            policies.split('\n\n').map((point, index) => <li key={index}>{point}</li>)
          )}
        </ul>
        <div className={ProgramCSS.courseButtonStyle}>
          {isEditing ? (
            <button className={`${ProgramCSS.coursesButton} ${QAPoliciesCSS.editButton}`} onClick={handleSave}>
              Submit
            </button>
          ) : (
            <button className={`${ProgramCSS.coursesButton} ${QAPoliciesCSS.editButton}`} onClick={handleEdit}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QAPolicies;
