import React, { Component } from 'react'
import { signupUser } from '../helpers/Auth'

export default class SignUpPage extends Component {
  render() {
    return (
      <div>
        <h3>email</h3>
        <input
          onChange={event => {
            this.email = event.target.value
          }}
        />
        <br />
        <h3>name</h3>
        <input
          title="name"
          onChange={event => {
            this.name = event.target.value
          }}
        />
        <br />
        <h3>password</h3>
        <input
          title="password"
          type="password"
          onChange={event => {
            this.password = event.target.value
          }}
        />
        <br />
        <button
          type="submit"
          onClick={event => {
            event.preventDefault()
            signupUser(this.email, this.password, this.name)
          }}
        >
          Login
        </button>
      </div>
    )
  }
}
