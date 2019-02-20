import axios from 'axios'

export const axiosGet = (...params) => {
  axios.defaults.headers.common['auth-token'] = localStorage.getItem('token')
  return axios.get(...params)
}

export const axiosPost = (...params) => {
  axios.defaults.headers.common['auth-token'] = localStorage.getItem('token')
  return axios.post(...params)
}
