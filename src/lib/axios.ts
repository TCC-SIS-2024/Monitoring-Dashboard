import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://0.0.0.0:8000/api/v1',
  withCredentials: true
})

api.interceptors.request.use((config) => {
  const userInformation = localStorage.getItem('userInformation')

  if (userInformation) {
    const localStorageUserInfo = JSON.parse(userInformation);
    const accessToken: string = localStorageUserInfo.access_token
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }

  return config
},
  error => {
    return Promise.reject(error)
  })

api.interceptors.request.use(async (config) => {
  await new Promise((resolve) =>
    setTimeout(resolve, Math.round(Math.random() * 3000)),
  )

  return config
})

