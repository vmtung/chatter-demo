const localSignupStrategy = require('./local-signup')
const localLoginStrategy = require('./local-login')

module.exports = {
  setup(passport) {
    const handler = passport.initialize()
    passport.use('local-signup', localSignupStrategy)
    passport.use('local-login', localLoginStrategy)
    return handler
  },
}
