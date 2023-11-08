import { apiClient } from '@lib/apiClient'
import { useQuery } from '@tanstack/react-query'
import { COURSES_QUERY_KEY } from './use-courses'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'
/**
 * Custom hook to get a course by its ID.
 *
 * @param {Object} param - Parameter object
 * @param {Number} courseId - The ID of the course we are querying.
 *
 */
const useCourseById = (courseId) => {
  return useQuery({
    queryKey: [COURSES_QUERY_KEY, courseId],
    enabled: !!courseId,
    queryFn: () =>
    axios.get(`${LARAVEL_BACKEND_URL}/courses/getCourseById/${courseId}`)
        .then((res) => res.data),
  })
}

export { useCourseById }
