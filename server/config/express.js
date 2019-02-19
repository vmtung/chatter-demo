const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const compression = require('compression')
const jwt = require('jsonwebtoken')
const jwtConfig = require('./jwt')

module.exports = () => {
  const app = express()

  app.use(compression())
  app.set('port', process.env.PORT || 3001)

  if (process.env.NODE_ENV !== 'production') {
    app.set('client', path.resolve(__dirname, '../../client/dist'))
    app.set('index', path.resolve(__dirname, '../../client/dist/index.html'))
  } else {
    app.set('client', path.resolve(__dirname, '../../client/build'))
    app.set('index', path.resolve(__dirname, '../../client/build/index.html'))
  }

  app.use(cors())
  app.use((req, res, next) => {
    const authToken = req.get('auth-token')
    if (authToken) {
      const { user } = jwt.verify(req.get('auth-token'), jwtConfig.secret) || {}
      req.user = user
    }
    next()
  })
  app.use('/client', express.static(app.get('client')))
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  consign({ cwd: 'server/app' })
    .include('models')
    .include('controllers')
    .include('middlewares')
    .then('routes')

    .into(app)
  app.get('*', (req, res) => {
    res.sendFile(app.get('index'))
  })

  return app
}
