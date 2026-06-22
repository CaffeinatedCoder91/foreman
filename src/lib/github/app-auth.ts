import { createSign } from 'crypto'

function base64url(input: Buffer | string): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input)
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function createAppJWT(): string {
  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const payload = base64url(
    JSON.stringify({ iat: now - 60, exp: now + 600, iss: process.env.GITHUB_APP_ID }),
  )
  const signer = createSign('RSA-SHA256')
  signer.update(`${header}.${payload}`)
  const signature = base64url(signer.sign(process.env.GITHUB_APP_PRIVATE_KEY!))
  return `${header}.${payload}.${signature}`
}

export async function createInstallationToken(installationId: string): Promise<string> {
  const jwt = createAppJWT()
  const res = await fetch(
    `https://api.github.com/app/installations/${installationId}/access_tokens`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'Foreman/1.0',
      },
    },
  )
  if (!res.ok) {
    throw new Error(`GitHub installation token request failed: ${res.status}`)
  }
  const data = (await res.json()) as { token: string }
  return data.token
}
