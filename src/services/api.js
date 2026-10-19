import axios from 'axios'
import { getToken, TOKEN_STORAGE_KEY } from '../auth/requireAuth.js'

export const api = axios.create({
  baseURL: import.meta.env?.VITE_API_URL || '/api',
  timeout: 15000,
  headers: { Accept: 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = getToken()

  if (token && !config.skipAuth) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }

  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const token = getToken()
    const authorization = error.config?.headers?.get('Authorization')

    if (error.response?.status === 401 && token && authorization === `Bearer ${token}`) {
      try {
        localStorage.removeItem(TOKEN_STORAGE_KEY)
      } finally {
        if (window.location.pathname !== '/login') {
          window.location.replace('/login')
        }
      }
    }

    return Promise.reject(error)
  },
)
