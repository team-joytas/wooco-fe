import CryptoJS from 'crypto-js'

const DELIMITER = ';'

/**
 * fetch 요청에 대한 HMAC-SHA256 서명 생성
 * 
 * @param path - API 경로 (예: '/courses')
 * @param body - 요청 바디 (JSON string)
 * @returns timestamp와 signature
 */
export function generateSignature(path: string, body: string = '') {
  const timestamp = Math.floor(Date.now() / 1000)
  const fullPath = '/api/v1' + path
  
  const matcher = `${timestamp}${DELIMITER}${fullPath}${DELIMITER}${body}${DELIMITER}`
  const signature = CryptoJS.HmacSHA256(
    matcher,
    process.env.NEXT_PUBLIC_SECRET_KEY || ''
  ).toString(CryptoJS.enc.Base64url)

  return { timestamp, signature }
}
