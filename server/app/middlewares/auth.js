const passport = require('passport')
const helper = require('../../config/passport')

module.exports = app => {
  helper.setup(passport)
  app.use(passport.initialize())
}
