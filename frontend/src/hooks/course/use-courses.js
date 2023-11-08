import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@lib/apiClient'
import axios from 'axios'
import { LARAVEL_BACKEND_URL } from '../../config'
const COURSES_QUERY_KEY = 'courses'

const useCourses = () => {
  return useQuery({
    queryKey: [COURSES_QUERY_KEY],
    queryFn: () => axios.get(`${LARAVEL_BACKEND_URL}/get-all-courses`).then((res) => res.data),
  })
}

export { COURSES_QUERY_KEY, useCourses }
