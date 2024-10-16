import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://0.0.0.0:8000/api/v1',
  withCredentials: true
})

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.round(Math.random() * 3000)),
  )

  return config
})

