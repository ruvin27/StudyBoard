import { Link } from 'react-router-dom'
import ProgramCSS from '@assets/css/program.module.css'
import ProgramImg from '@assets/images/program.jpg'
import React,{useEffect, useState} from 'react'
import { apiClient } from '@lib/apiClient'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const Program = () => {
  const [objectives, setObjectives] = useState([])

  useEffect(() => {
    // Fetch color data from the database using Axios
    axios.get(`${LARAVEL_BACKEND_URL}/objectives`)
      .then((response) => {
        setObjectives(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching Objectives data:', error)
      })
  }, [])

  return (
    <div className={ProgramCSS.container}>
      <div className={ProgramCSS.programDetails}>
        <div className={ProgramCSS.contentHeader}>
          <h1>Masters of Science in Data Science</h1>
        </div>
        <div className={ProgramCSS.frontImage}>
          <img src={ProgramImg} alt="" />
        </div>
        <ul>
        {objectives.map((objective, index) => (
            <li key={index}>
            {objective.objective}
          </li>
          ))}
          
        </ul>
        <div className={ProgramCSS.courseButtonStyle}>
          <Link to={'/allcourses'}>
            <button className={ProgramCSS.coursesButton}>All Courses</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Program
