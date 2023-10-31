import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProgramCSS from '@assets/css/program.module.css';
import QAPoliciesCSS from '@assets/css/courses.module.css';
import { apiClient } from '@lib/apiClient';
import TextEditCSS  from '@assets/css/QAPolicies.module.css'

const QAPolicies = () => {
  const [policies, setPolicies] = useState('');
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // Make an API call to save the edited policies to the backend
    apiClient
      .post('QA/QAPolicies.php', { policies }) // Adjust the URL
      .then((response) => {
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
            <textarea
              className={TextEditCSS.editPolicies}
              value={policies}
              onChange={(e) => setPolicies(e.target.value)}
            ></textarea>
          ) : (
            policies.split('\n\n').map((point, index) => (
              <li key={index}>{point}</li>
            ))
          )}
        </ul>
        <div className={ProgramCSS.courseButtonStyle}>
          {isEditing ? (
            <button
              className={`${ProgramCSS.coursesButton} ${QAPoliciesCSS.editButton}`}
              onClick={handleSave}
            >
              Submit
            </button>
          ) : (
            <button
              className={`${ProgramCSS.coursesButton} ${QAPoliciesCSS.editButton}`}
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QAPolicies;
