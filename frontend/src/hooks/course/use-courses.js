import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@lib/apiClient'

const COURSES_QUERY_KEY = 'courses'

const useCourses = () => {
  return useQuery({
    queryKey: [COURSES_QUERY_KEY],
    queryFn: () => apiClient.get('/course/getAll.php').then((res) => res.data),
  })
}

export { COURSES_QUERY_KEY, useCourses }
