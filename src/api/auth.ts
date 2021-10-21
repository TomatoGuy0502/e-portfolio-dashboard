import { req } from './index'

export const login = ({ userId, password }: { userId: string, password: string }) => {
  return req.post<{ succeeded: string, errorMessage: string, tokenStr: string }>('/auth/login', {
    studentId: userId,
    password
  })
}

export const checkToken = () => {
  return req.post('/auth/check-token')
}
