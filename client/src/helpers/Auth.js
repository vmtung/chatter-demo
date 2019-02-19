import axios from 'axios'

let authCallbacks = []
// Auth.signupUser('test@test.com', '12345678', 'test')
// Auth.loginUser('test@test.com', '12345678')

// TODO: add check user login by calling to server, and trigger callback if token invalid
const isUserAuthenticated = () => localStorage.getItem('token') !== null

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
  axios
    .post('/auth/login', {
      email,
      password,
    })
    .then(res => authenticateUser(res.data.token))

export const logoutUser = () => deauthenticateUser()

export const signupUser = (email, password, name) =>
  axios.post('/auth/signup', {
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

// loginUser('test@test.com', '12345678').then(() =>
//   axios.get('/auth/me').then(res => console.log('me', res))
// )
