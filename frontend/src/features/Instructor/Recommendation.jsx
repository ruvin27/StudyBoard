import RecommendationCSS from '@assets/css/NewUser.module.css'
import LoadingSpinner from '@features/LoadingSpinner'
import { apiClient } from '@lib/apiClient'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

const Recommendation = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  React.useEffect(() => {
    const courseId = searchParams.get('courseId')

    if (!courseId) {
      navigate('/InstructorCourseInfo')
    }
  }, [navigate, searchParams])

  const courseId = searchParams.get('courseId')

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['recommendation', { courseId }],
    queryFn: async () => {
      const response = await axios.get(`${LARAVEL_BACKEND_URL}/recommendations/${courseId}`)

      return response.data
    },
  })

  if (isLoading) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <div>
        <div className={RecommendationCSS.addContainer}>
          <h2 className={RecommendationCSS.addAccessHeader}>Recommendations</h2>
        </div>
        {/* <div className={RecommendationCSS.searchContainer}>
          <input
            type="text"
            className={RecommendationCSS.searchInput}
            placeholder="Search..."
          />
          <button className={RecommendationCSS.searchButton}>Search</button>
        </div> */}

        {recommendations.data.length > 0 ? (
          <table className={RecommendationCSS.newUsersTable}>
            <thead>
              <tr>
                <th>User Email</th>
                <th>Role</th>
                <th>Course Change Recommendation</th>
              </tr>
            </thead>
            <tbody>
              {recommendations.data.map((recommendation) => (
                <tr key={recommendation.recommendation_id}>
                  <td>{recommendation.sender.email}</td>
                  <td>{recommendation.sender.role}</td>
                  <td>{recommendation.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No recommendations found</p>
        )}
      </div>
    </div>
  )
}
export default Recommendation
