import axios from 'axios'
import { getToken } from './auth'


const baseUrl = '/api'

function headers() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` }, 
  }
}

//* Movie requests

export function addNewMovie(newMovieData) {
  return axios.post(`${baseUrl}/movies`, newMovieData, headers())
}

// * Auth Requests

export function registerUser(formData) {
  return axios.post(`${baseUrl}/register`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/login`, formData)
}