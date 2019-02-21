const jwt = require('jsonwebtoken')
const jwtConfig = require('../config/jwt')

module.exports = {
  getUserFromToken(authToken) {
    const { user, expired } = jwt.verify(authToken, jwtConfig.secret) || {}
    if (user && user._id && new Date() <= new Date(expired)) {
      // still good
      return user
    }
    return null
  },
}
