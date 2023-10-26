import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@lib/apiClient'

/**
 * Custom hook for creating a new course.
 *
 * @param {Object} data - The required data for creating a new course.
 * @param {string} data.course_name - The name of the new course.
 * @param {string} data.course_description - The description of the new course.
 * @param {number} data.instructor_id - The ID of the instructor leading the new course.
 * @param {number} data.program_id - The ID of the program to which the new course belongs.
 */
const useCreateCourse = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await apiClient.post('/course/create.php', data)
      return res.data
    },
  })
}

export { useCreateCourse }
