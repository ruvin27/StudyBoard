import { useMutation } from '@tanstack/react-query'
import { apiClient } from '@lib/apiClient'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'

/**
 * @typedef Question
 * @property {string} question
 * @property {string} answer
 * @property {string} mcq1
 * @property {string} mcq2
 * @property {string} mcq3
 * @property {string} mcq4
 */

/**
 * Custom hook for creating a new exam.
 *
 * @param {Object} data - The required data for creating a new exam.
 * @param {string} data.exam_title - The title of the exam.
 * @param {string} data.exam_description - The description of the exam.
 * @param {string} data.exam_date - The date of the exam.
 * @param {number} data.exam_score - The score of the exam.
 * @param {number} data.course_id - The ID of the course to which the exam belongs.
 * @param {Question[]} data.questions - The list of questions for the exam.
 */
const useCreateExam = (data) => {
  return useMutation({
    mutationFn: async () => {
      const res = await axios.post(`${LARAVEL_BACKEND_URL}/exams/create`, data)
      return res.data
    },
  })
}

export { useCreateExam }
