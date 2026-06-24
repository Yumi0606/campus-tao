import client from './client'

export const fileApi = {
  /**
   * 上传文件（图片等）到阿里云 OSS
   * @param file 要上传的文件
   * @returns 上传后的文件 URL
   */
  upload(file: File): Promise<string> {
    const formData = new FormData()
    formData.append('file', file)
    return client.post('/api/file/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
