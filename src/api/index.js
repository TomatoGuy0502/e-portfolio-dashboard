import axios from 'axios'

const errorHandler = (error) => {
  if (error.response) {
    console.error(error.response)
  } else if (error.request) {
    // 沒有收到回應
    if (error?.code === 'ECONNABORTED') {
      console.error('請求時間過長，取消請求')
    }
  } else {
    // 送出請求之前就遇到錯誤了
    console.error('請求沒有送出：', error.message)
  }
}

export const req = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.VUE_APP_API_URL
      : 'https://api.e-portfolio.dev-box.site/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000
})

// 收到Response時，檢查status code
req.interceptors.response.use(
  response => {
    return response
  },
  error => {
    errorHandler(error)
    return Promise.reject(error.response.data)
  }
)
