import CryptoJS from 'crypto-js'
import { InternalAxiosRequestConfig } from 'axios'
import { AxiosHeaders } from 'axios'

const DELIMITER = ';'

export const addRequestSignature = (request: InternalAxiosRequestConfig) => {
  const timestamp = Math.floor(Date.now() / 1000)
  const path = '/api/v1' + request.url
  const body = JSON.stringify(request.data) || ''

  const matcher = `${timestamp}${DELIMITER}${path}${DELIMITER}${body}${DELIMITER}`
  const signature = CryptoJS.HmacSHA256(
    matcher,
    process.env.NEXT_PUBLIC_SECRET_KEY || ''
  ).toString(CryptoJS.enc.Base64url)

  if (!request.headers) {
    request.headers = new AxiosHeaders()
  }

  request.headers[process.env.NEXT_PUBLIC_CUSTOM_TIMESTAMP_HEADER || ''] =
    timestamp
  request.headers[process.env.NEXT_PUBLIC_CUSTOM_SIGNATURE_HEADER || ''] =
    signature

  return request
}
