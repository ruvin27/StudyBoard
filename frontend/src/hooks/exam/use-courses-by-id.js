import { apiClient } from '@lib/apiClient'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

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
    axios.get(`${LARAVEL_BACKEND_URL}/exams/getById/${examId}`)
        .then((res) => res.data),
  })
}

export { useExamById }
