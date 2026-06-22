import { createHmac, timingSafeEqual } from 'crypto'

/**
 * Verifies a GitHub webhook HMAC-SHA256 signature.
 * Must be called before trusting any payload content.
 */
export function verifyGitHubSignature(
  rawBody: string,
  signatureHeader: string | null,
  secret: string,
): boolean {
  if (!signatureHeader || !signatureHeader.startsWith('sha256=')) return false

  const hmac = createHmac('sha256', secret)
  hmac.update(rawBody, 'utf8')
  const expected = `sha256=${hmac.digest('hex')}`

  // Lengths must match before timingSafeEqual to avoid throwing
  if (Buffer.byteLength(signatureHeader) !== Buffer.byteLength(expected)) return false

  return timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expected))
}
