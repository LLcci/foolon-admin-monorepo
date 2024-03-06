import { Request } from 'express'

export default function extractTokenFromHeader(request: Request): string | undefined {
  const [type, token] = request.headers.authorization?.split(' ') ?? []
  return type === 'Bearer' ? token : undefined
}
