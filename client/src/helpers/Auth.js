import axios from 'axios'
import io from 'socket.io-client'
import { axiosGet, axiosPost } from './AxiosWrap'

const socket = io.connect()
socket.on('news', data => {
  console.log(data)
  socket.emit('my other event', { my: 'data' })
})

let authCallbacks = []
let currentUser = null

function isUserAuthenticated() {
  const hasToken = localStorage.getItem('token') !== null
  if (hasToken) {
    axiosGet('/auth/me').then(res => {
      if (res.data && res.data._id) {
        currentUser = res.data
      } else {
        logoutUser()
      }
    })
  }
  return hasToken
}

const triggerCbs = value => {
  const isAuthed = value !== undefined ? value : isUserAuthenticated()
  const cbs = [...authCallbacks]
  cbs.forEach(cb => {
    if (typeof cb === 'function') {
      cb(isAuthed)
    }
  })
}

const authenticateUser = token => {
  localStorage.setItem('token', token)
  axios.defaults.headers.common['auth-token'] = token
  triggerCbs(true)
}

const deauthenticateUser = () => {
  localStorage.removeItem('token')
  axios.defaults.headers.common['auth-token'] = null
  triggerCbs(false)
}

export const loginUser = (email, password) =>
  axiosPost('/auth/login', {
    email,
    password,
  }).then(res => authenticateUser(res.data.token))

export function logoutUser() {
  return deauthenticateUser()
}

export const signupUser = (email, password, name) =>
  axiosPost('/auth/signup', {
    email,
    password,
    name,
  })

export const onAuthChanged = cb => {
  if (typeof cb !== 'function') return
  const newCbs = [...authCallbacks, cb]
  authCallbacks = newCbs.filter(item => typeof item === 'function')
  cb(isUserAuthenticated())
}

export const getCurrentUser = () => currentUser

// loginUser('test@test.com', '12345678').then(() =>
//   axios.get('/auth/me').then(res => console.log('me', res))
// )
