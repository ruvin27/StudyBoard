import { apiClient } from '@lib/apiClient'
import { useQuery } from '@tanstack/react-query'
import { COURSES_QUERY_KEY } from './use-courses'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'
/**
 * Custom hook to get all courses taught by a specific instructor.
 *
 * @param {Object} param - Parameter object
 * @param {Number} param.instructorId - The ID of the instructor for whose courses we are querying.
 *
 * @returns {Object} Query object with methods to manage query state, refetch, etc.
 */
const useCoursesByInstructor = ({ instructorId }) => {
  return useQuery({
    queryKey: [COURSES_QUERY_KEY, instructorId],
    enabled: !!instructorId,
    queryFn: () =>
    axios.get(`${LARAVEL_BACKEND_URL}/courses/getAllByInstructorId/${instructorId}`)
        .then((res) => res.data),
  })
}

export { useCoursesByInstructor }
