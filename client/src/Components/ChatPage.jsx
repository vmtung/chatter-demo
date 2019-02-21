import React, { Component } from 'react'

export default class Chat extends Component {
  componentDidMount() {
    const {
      roomId
    } = this.props
    // fetch room chat content and set to listen
  }

  render() {
    const messages = []
    return (
      <div>
        <h1>Chat Page</h1>
        {messages.map(item => {
          const { from, message } = item
          return (
            <div>
              {from} : {message}
            </div>
          )
        })}
      </div>
    )
  }
}
