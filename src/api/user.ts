import client from './client'
import type { LoginResult, UserInfo, RegisterRequest, UserUpdateRequest } from './types'

export const userApi = {
  /**
   * 注册新用户
   * 后端返回 Result<LoginResponse>，data 为登录凭证
   */
  register(data: RegisterRequest): Promise<LoginResult> {
    return client.post('/api/user/register', data)
  },

  /**
   * 登录
   * 后端返回 Result<LoginResponse>，data 为登录凭证
   */
  login(data: { /** 用户名或手机号 */ account: string; /** 密码 */ password: string }): Promise<LoginResult> {
    return client.post('/api/user/login', data)
  },

  /**
   * 获取当前登录用户个人信息
   * 后端返回 Result<User>
   */
  getInfo(): Promise<UserInfo> {
    return client.get('/api/user/info')
  },

  /**
   * 修改个人信息（只传需要修改的字段）
   * 后端返回 Result<Void>
   */
  updateInfo(data: UserUpdateRequest): Promise<void> {
    return client.put('/api/user/info', data)
  },

  /**
   * 提交学生证认证
   * 后端返回 Result<String>，data 为提示信息如 "已提交认证，审核中"
   * @param studentCardUrl 学生证照片 URL（需先通过 fileApi.upload 上传获取）
   */
  verifyStudent(studentCardUrl: string): Promise<string> {
    return client.post('/api/user/verify-student', null, { params: { studentCardUrl } })
  },
}
