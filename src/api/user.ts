import client from './client'
import type { LoginResult, UserInfo, RegisterRequest, UserUpdateRequest } from './types'

export const userApi = {
  /**
   * 注册新用户
   * @returns 登录凭证（token + 用户信息）
   */
  register(data: RegisterRequest): Promise<LoginResult> {
    return client.post('/api/user/register', data)
  },

  /**
   * 登录
   * @returns 登录凭证（token + 用户信息）
   */
  login(data: { /** 用户名或手机号 */ account: string; /** 密码 */ password: string }): Promise<LoginResult> {
    return client.post('/api/user/login', data)
  },

  /** 获取当前登录用户个人信息 */
  getInfo(): Promise<UserInfo> {
    return client.get('/api/user/info')
  },

  /** 修改个人信息（只传需要修改的字段） */
  updateInfo(data: UserUpdateRequest): Promise<UserInfo> {
    return client.put('/api/user/info', data)
  },

  /**
   * 提交学生证认证
   * @param studentCardUrl 学生证照片 URL（需先通过 fileApi.upload 上传获取）
   */
  verifyStudent(studentCardUrl: string): Promise<void> {
    return client.post('/api/user/verify-student', null, { params: { studentCardUrl } })
  },
}
