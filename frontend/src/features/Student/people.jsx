// import PeopleCSS from '@assets/css/NewUser.module.css'

// export default function StudentPeople() {
//   return (
//     <>
//       <div className={PeopleCSS.container}>
//         <div className={PeopleCSS.leftElement}>
//           <h2>Course Name</h2>
//         </div>
//       </div>

//       <div>
//         <table className={PeopleCSS.newUsersTable}>
//           <thead>
//             <tr>
//               <th colSpan="3">People</th>
//             </tr>
//             <tr>
//               <th>Role</th>
//               <th>Name</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr>
//               <td>Instructor</td>
//               <td>Instructor Name</td>
//             </tr>
//             <tr>
//               <td>Student</td>
//               <td>Student 1</td>
//             </tr>
//             <tr>
//               <td>Student</td>
//               <td>Student 2</td>
//             </tr>
//             <tr>
//               <td>Student</td>
//               <td>Student 3</td>
//             </tr>
//             <tr>
//               <td>Student</td>
//               <td>Student 4</td>
//             </tr>
//             <tr>
//               <td>Student</td>
//               <td>Student 5</td>
//             </tr>
//             <tr>
//               <td>Student</td>
//               <td>Student 6</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </>
//   )
// }



// import React, { useState, useEffect } from 'react'
// import { Link, useParams } from 'react-router-dom'
// import PeopleCSS from '@assets/css/NewUser.module.css'
// import { useAuth } from '@contexts/AuthContext'
// import { apiClient } from '@lib/apiClient'

// const StudentPeople = () => {
//   const { courseId } = useParams()
//   const { user } = useAuth()
//   const [peopleDetails, setPeopleDetails] = useState([]) // Initialize with an empty array

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await apiClient.post(
//           'student/People.php',
//           {
//             courseId: courseId,
//             userid: user.userid, // If you need to send user information
//           }
//         )

//         setPeopleDetails(response.data)
//       } catch (error) {
//         console.error('Error fetching people details:', error)
//       }
//     }

//     if (user) {
//       fetchData()
//     }
//   }, [courseId, user])

//   return (
//     <>
//       {peopleDetails.length > 0 ? (
//         <>
//           <div>
//             <p>Number of Rows: {peopleDetails.length}</p>
//             {peopleDetails.map((student, index) => (
//               <div key={index}>
//                 <p>Student ID: {student.student_id}</p>
//                 <p>Course ID: {student.course_id}</p>
//               </div>
//             ))}
//           </div>
//         </>
//       ) : (
//         <p>No people found for this course.</p>
//       )}
//     </>
//   )
// }

// export default StudentPeople;
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import PeopleCSS from '@assets/css/NewUser.module.css';
import { useAuth } from '@contexts/AuthContext';
import { apiClient } from '@lib/apiClient';

const StudentPeople = () => {
  const { courseId } = useParams();
  const { user } = useAuth();
  const [peopleDetails, setPeopleDetails] = useState([]);
  const [courseName, setCourseName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.post('student/People.php', {
          courseId: courseId,
          userid: user.userid,
        });

        setPeopleDetails(response.data);

        // Fetch the course name here
        const courseResponse = await apiClient.get('student/CourseName.php', {
          courseId: courseId,
        });
        setCourseName(courseResponse.data);
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
              <h2>{courseName}</h2>
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
