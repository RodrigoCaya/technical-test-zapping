import { api } from '../index.js'

export const login = async (loginData) => {
  const response = await api.post('/user/login', loginData)
  return response.data
}

export const createUser = async (user) => {
  const response = await api.post('/user/create', user)
  return response.data
}

