import React, { Component } from 'react'
import logo from './logo.svg'
import AppStyle from './App.css'

console.log('AppStyle', AppStyle)

class App extends Component {
  render() {
    return (
      <div className={AppStyle.App}>
        <header className={AppStyle['App-header']}>
          <img src={logo} className={AppStyle['App-logo']} alt="logo" />
          <h1 className={AppStyle['App-title']}>Welcome to React</h1>
        </header>
        <p className={AppStyle['App-intro']}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
