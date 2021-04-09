import React, { Component } from 'react'
// import routes from './routes.js';

import {
  BrowserRouter as Router,
  Route,
  // Link,
  Redirect,
  // withRouter,
} from 'react-router-dom'

// import Base from './components/Base.jsx'
// import LoginPage from './containers/LoginPage.jsx'
// import LogoutFunction from './containers/LogoutFunction.jsx'
// import DashboardPage from './containers/DashboardPage.jsx'
import WithAuth from './Components/HOCs/WithAuth'
import Header from './Components/Header'
import HomePage from './Components/HomePage'
import ChatPage from './Components/ChatPage'
import LoginPage from './Components/LoginPage'
import SignUpPage from './Components/SignUpPage'

import './helpers/Socket'

const CustomRoute = WithAuth(({ component: Comp, isPrivate, isLoggedOut, ...rest }) => {
  const needAuth = isPrivate || isLoggedOut
  if (needAuth) {
    if (rest.authData.init) {
      return <div>Loading</div>
    }
  }
  return (
    <Route
      {...rest}
      render={props => {
        const { authed } = rest.authData
        if (!needAuth || (isPrivate && authed) || (isLoggedOut && !authed)) {
          return <Comp {...props} {...rest} />
        }
        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: props.location },
            }}
          />
        )
      }}
    />
  )
})

class Main extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <CustomRoute exact path="/" component={HomePage} />
          <CustomRoute isLoggedOut path="/login" component={LoginPage} />
          <CustomRoute isLoggedOut path="/signup" component={SignUpPage} />
          <CustomRoute isPrivate exact path="/chat" component={ChatPage} />
          {/* <CustomRoute path="*" component={false} /> */}
          {/* 
          <MultiRoute isPrivate path="/dashboard" component={DashboardPage} />
          <MultiRoute isLoggedOut path="/login" component={LoginPage} /> */}
          {/* <MultiRoute isLoggedOut path="/signup" component={SignUpPage} /> */}
          {/* <Route path="/logout" component={LogoutFunction} /> */}
        </div>
      </Router>
    )
  }
}

export default Main
