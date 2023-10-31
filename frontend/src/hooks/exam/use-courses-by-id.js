import { apiClient } from '@lib/apiClient'
import { useQuery } from '@tanstack/react-query'

const EXAM_QUERY_KEY = 'exam'

/**
 * Custom hook to get a course by its ID.
 *
 * @param {Object} param - Parameter object
 * @param {Number} examId - The ID of the course we are querying.
 *
 */
const useExamById = (examId) => {
  return useQuery({
    queryKey: [EXAM_QUERY_KEY, examId],
    enabled: !!examId,
    queryFn: () =>
      apiClient
        .get('/exam/getById.php', {
          params: {
            id: examId,
          },
        })
        .then((res) => res.data),
  })
}

export { useExamById }
