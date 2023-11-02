import FindUserCSS from '@assets/css/finduser.module.css'
import React, { useState, useEffect } from 'react'
import { apiClient } from '@lib/apiClient'
const Settings = () => {
  const [colors, setColors] = useState([])

  useEffect(() => {
    // Fetch color data from the database using Axios
    apiClient
      .get('/Admin/colors.php')
      .then((response) => {
        setColors(response.data)
      })
      .catch((error) => {
        console.error('Error fetching color data:', error)
      })
  }, [])

  const handleColorCodeChange = (colorId, hexColor) => {
    const updatedColors = [...colors]

    const colorIndex = updatedColors.findIndex((color) => color.id === colorId)
    if (colorIndex !== -1) {
      updatedColors[colorIndex].hexColor = hexColor
    }

    setColors(updatedColors)
  }

  const handleChange = (index) => {
    apiClient
      .post('/Admin/setcolor.php', {
        hexColor: colors[index].hexColor,
        id: colors[index].id,
      })
      .then((res) => {
        alert(res.data)
      })
  }
  return (
    <div>
      <div className={FindUserCSS.container}>
        <div className={FindUserCSS.leftElement}>
          <h2>Website Design and Settings</h2>
        </div>
      </div>
      <table className={FindUserCSS.findUserTable}>
        <thead>
          <tr>
            <th>Use</th>
            <th>Color Code</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {colors.map((color, index) => (
            <tr key={color.id}>
              <td>{color.desc}</td>
              <td>
                <input type="text" value={color.hexColor} onChange={(e) => handleColorCodeChange(color.id, e.target.value)} />
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

export default Settings
