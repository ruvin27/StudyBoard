import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@lib/apiClient'

const EXAM_QUERY_KEY = 'exams'

/**
 * Custom hook to get all courses (with exams, students and grades) taught by a specific instructor.
 *
 * @param {Number} instructorId - The ID of the instructor for whose courses we are querying.
 */
const useExamsByInstructor = (instructorId) => {
  return useQuery({
    queryKey: [EXAM_QUERY_KEY, instructorId],
    enabled: !!instructorId,
    queryFn: () =>
      apiClient
        .get('/exam/getAllByInstructorId.php', {
          params: {
            id: instructorId,
          },
        })
        .then((res) => res.data),
  })
}

export { useExamsByInstructor }
