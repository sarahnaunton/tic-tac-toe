import axios, { type AxiosInstance } from 'axios'
import errorInterceptor from './interceptors/error'
import updateHeaderInterceptor from './interceptors/update-header'

const baseURL = process.env.API_BASE_URL || 'http://localhost:3000'

const httpClient: AxiosInstance = axios.create({
  baseURL,
  withCredentials: false
})

errorInterceptor(httpClient)
updateHeaderInterceptor(httpClient)

export default httpClient
