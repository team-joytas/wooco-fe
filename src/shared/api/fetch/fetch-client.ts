'use client'

import { generateSignature } from './signature'

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>
}

/**
 * Base Fetch Client
 * 백엔드 API와 직접 통신하는 fetch 기반 클라이언트
 */
class FetchClient {
  private baseURL: string
  private withAuth: boolean

  constructor(baseURL: string, withAuth: boolean = false) {
    this.baseURL = baseURL
    this.withAuth = withAuth
  }

  private async request<T>(
    endpoint: string,
    options: FetchOptions = {}
  ): Promise<T> {
    const { params, ...fetchOptions } = options

    // URL 생성
    let url = `${this.baseURL}${endpoint}`
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }

    // 헤더 설정
    const headers = new Headers(fetchOptions.headers)

    // Content-Type 기본값
    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    // 인증 토큰 추가 (authFetch만)
    if (this.withAuth) {
      const token = localStorage.getItem('accessToken')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
    }

    // 서명 추가 (모든 요청)
    const { timestamp, signature } = generateSignature(
      endpoint,
      fetchOptions.body as string
    )
    headers.set(
      process.env.NEXT_PUBLIC_CUSTOM_TIMESTAMP_HEADER || 'X-Timestamp',
      timestamp.toString()
    )
    headers.set(
      process.env.NEXT_PUBLIC_CUSTOM_SIGNATURE_HEADER || 'X-Signature',
      signature
    )

    try {
      const response = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: 'include',
      })

      // 401 에러 처리 (authFetch만)
      if (response.status === 401 && this.withAuth) {
        const newToken = await this.refreshToken()
        if (newToken) {
          headers.set('Authorization', `Bearer ${newToken}`)
          const retryResponse = await fetch(url, {
            ...fetchOptions,
            headers,
            credentials: 'include',
          })

          if (!retryResponse.ok) {
            throw new Error(`HTTP ${retryResponse.status}`)
          }

          const data = await retryResponse.json()
          return data.results
        } else {
          localStorage.removeItem('accessToken')
          window.location.href = '/login'
          throw new Error('Unauthorized')
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const data = await response.json()
      return data.results
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  private async refreshToken(): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseURL}/auth/reissue`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        return null
      }

      const data = await response.json()
      if (data.results?.accessToken) {
        localStorage.setItem('accessToken', data.results.accessToken)
        return data.results.accessToken
      }
      return null
    } catch {
      return null
    }
  }

  async get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }

  async post<T>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async patch<T>(
    endpoint: string,
    body?: unknown,
    options?: FetchOptions
  ): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    })
  }

  async delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
}

/**
 * authFetch: 인증이 필요한 API용
 * - 자동 토큰 추가
 * - 401 에러 시 자동 토큰 갱신
 * - 서명 추가
 */
export const authFetch = new FetchClient(`${SERVER_URL}/api/v1`, true)

/**
 * publicFetch: 인증이 불필요한 공개 API용
 * - 토큰 추가 안 함
 * - 401 에러 처리 안 함
 * - 서명만 추가
 */
export const publicFetch = new FetchClient(`${SERVER_URL}/api/v1`, false)
