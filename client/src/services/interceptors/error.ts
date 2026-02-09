import type { AxiosInstance } from 'axios'

export default function errorInterceptor(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API error:', error.response?.status, error.response?.data ?? error.message)
      throw error
    }
  )
}
