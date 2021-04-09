import React, { Component } from 'react'
import { loginUser } from '../helpers/Auth'

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <input
          title="email"
          onChange={event => {
            this.email = event.target.value
          }}
        />
        <input
          title="password"
          onChange={event => {
            this.password = event.target.value
          }}
        />
        <button
          type="submit"
          onClick={event => {
            event.preventDefault()
            loginUser(this.email, this.password)
          }}
        >
          Login
        </button>
      </div>
    )
  }
}
