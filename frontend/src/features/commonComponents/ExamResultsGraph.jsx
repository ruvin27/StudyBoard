import React, { useState, useEffect } from 'react';
import { Chart } from 'react-google-charts';
import axios from 'axios';
import { LARAVEL_BACKEND_URL } from '../../config';
import { useParams } from 'react-router-dom';


// Function to create and export the ExamResultsGraph component
export default function ExamResultsGraph() {
  const [data, setData] = useState([]);
  const { examId, exam } = useParams();
  const [options, setOptions] = useState({
    chart: {
      title: `Exam Name: ${exam}`,
      subtitle: "Exam Scores for Students",
    },
  })

  useEffect(() => {
    // Fetch color data from the database using Axios
    axios
      .get(`${LARAVEL_BACKEND_URL}/exam-graph-data/${examId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching exam data:', error);
      });
  }, []);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Chart
        chartType="Bar"
        width="80%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
}
