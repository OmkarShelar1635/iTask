import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

axios.interceptors.request.use((req) => {
  const token = localStorage.getItem('token')
  if (token) req.headers.Authorization = `Bearer ${token}`
  return req
})

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true

      const refreshToken = localStorage.getItem('refreshToken')
      const { data } = await axios.post('/api/auth/refresh', {
        refreshToken
      })

      localStorage.setItem('token', data.accessToken)
      original.headers.Authorization =
        `Bearer ${data.accessToken}`

      return axios(original)
    }
    return Promise.reject(err)
  }
)

export default axios
