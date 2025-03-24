'use client'

import axios, { AxiosInstance } from 'axios'
import { addRequestSignature } from './signature'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const customAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 토큰 인터셉터
customAxios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken')
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

// 서명 인터셉터
customAxios.interceptors.request.use(addRequestSignature)

// 에러 및 reissue 인터셉터
customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    const accessToken = localStorage.getItem('accessToken')
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      accessToken
    ) {
      originalRequest._retry = true

      try {
        const { data } = await axios.post(
          `${SERVER_URL}/api/v1/auth/reissue`,
          {},
          {
            withCredentials: true,
            headers: { 'Content-Type': 'application/json' },
          }
        )

        if (data.accessToken) {
          localStorage.setItem('accessToken', data.accessToken)
          originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
          return customAxios(originalRequest)
        }
      } catch (reissueError) {
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
        return Promise.reject(reissueError)
      }
    }
    return Promise.reject(error)
  }
)

export const publicAxios: AxiosInstance = axios.create({
  baseURL: `${SERVER_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// 서명 인터셉터
publicAxios.interceptors.request.use(addRequestSignature)
