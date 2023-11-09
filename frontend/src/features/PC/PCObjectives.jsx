import FindUserCSS from '@assets/css/finduser.module.css'
import React, { useState, useEffect } from 'react'
import { apiClient } from '@lib/apiClient'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const PCObjectives = () => {
  const [objectives, setObjectives] = useState([])

  useEffect(() => {
    axios.get(`${LARAVEL_BACKEND_URL}/objectives`)
      .then((response) => {
        setObjectives(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching Objectives data:', error)
      })
  }, [])

  const handleColorCodeChange = (objective_id, objective) => {
    const updatedObjectives = [...objectives]

    const objectiveIndex = updatedObjectives.findIndex((objective) => objective.objective_id === objective_id)
    if (objectiveIndex !== -1) {
      updatedObjectives[objectiveIndex].objective = objective
    }

    setObjectives(updatedObjectives)
  }

  const handleChange = (index) => {
    axios.put(`${LARAVEL_BACKEND_URL}/update-objective`, {
        objective: objectives[index].objective,
        objective_id: objectives[index].objective_id,
      })
      .then((res) => {
        alert(res.data.message)
      })
  }
  return (
    <div>
      <div className={FindUserCSS.container}>
        <div className={FindUserCSS.leftElement}>
          <h2>Program Objectives</h2>
        </div>
      </div>
      <table className={FindUserCSS.findUserTable}>
        <thead>
          <tr>
            <th>Objective</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {objectives.map((objective, index) => (
            <tr key={index}>
              <td>
                <textarea style={{height:"100px", width: "280px"}} value={objective.objective} onChange={(e) => handleColorCodeChange(objective.objective_id, e.target.value)} />{' '}
              </td>
              <td>
                <button className={FindUserCSS.findUserBtn} onClick={() => handleChange(index)}>
                  Change
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PCObjectives
