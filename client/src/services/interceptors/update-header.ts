import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

export default function updateHeaderInterceptor(client: AxiosInstance): void {
  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    config.headers.set('Content-Type', 'application/json')
    return config
  })
}
