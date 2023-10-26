import { apiClient } from '@lib/apiClient'
import { useQuery } from '@tanstack/react-query'
import { COURSES_QUERY_KEY } from './use-courses'

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
      apiClient
        .get('/course/getById.php', {
          params: {
            id: courseId,
          },
        })
        .then((res) => res.data),
  })
}

export { useCourseById }
