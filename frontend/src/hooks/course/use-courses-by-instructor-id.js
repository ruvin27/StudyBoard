import { apiClient } from '@lib/apiClient'
import { useQuery } from '@tanstack/react-query'
import { COURSES_QUERY_KEY } from './use-courses'

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
      apiClient
        .get('/course/getAllByInstructorId.php', {
          params: {
            id: instructorId,
          },
        })
        .then((res) => res.data),
  })
}

export { useCoursesByInstructor }
