import axios from 'axios'
// import { getToken } from './auth'


const baseUrl = '/api'

// * Auth Requests

export function registerUser(formData) {
  return axios.post(`${baseUrl}/register`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/login`, formData)
}