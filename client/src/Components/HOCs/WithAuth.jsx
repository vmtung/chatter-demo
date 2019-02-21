import React, { Component } from 'react'
import { onAuthChanged } from '../../helpers/Auth'
// TODO: check local first, then remote, if mismatch then update like remote
export default function withAuth(Comp) {
  return class authHOC extends Component {
    state = {
      authed: null,
    }

    componentDidMount() {
      this.stopSub = onAuthChanged(isAuthed => {
        this.setState({
          authed: isAuthed,
        })
      })
    }

    componentWillUnmount() {
      if (this.stopSub) this.stopSub()
    }

    render() {
      const { authed } = this.state
      const init = authed === null
      return <Comp authData={{ authed, init }} {...this.props} />
    }
  }
}
