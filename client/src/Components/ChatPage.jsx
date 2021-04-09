import React, { Component } from 'react'
import { axiosGet } from '../helpers/AxiosWrap'
import { getCurrentUser } from '../helpers/Auth'

export default class Chat extends Component {
  state = {
    availableUsers: [],
  }

  componentDidMount() {
    axiosGet('/user/online-list').then(res => {
      if (res.data) {
        const currentUser = getCurrentUser()

        this.setState({
          availableUsers: res.data,
          // .filter(item => item._id !== currentUser._id),
        })
      }
    })
  }

  render() {
    const { availableUsers } = this.state
    return (
      <div>
        <h1>Chat Page</h1>
        <div>
          <div
            style={{
              display: 'inline-block',
              marginRight: 25,
              verticalAlign: 'top',
            }}
          >
            {availableUsers.map(item => (
              <div key={item._id}>
                <button stype="button" onClick={(e) => {
                  // set user id state, open send direct message ui
                }}>
                  {item.name} ({item.email})
                </button>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'inline-block',
              verticalAlign: 'top',
            }}
          >
            <textarea onChange={e => (this.msg = e.target.value)} />
            <button
              type="submit"
              onClick={e => {
                e.preventDefault()
                // send
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    )
  }
}
