const localSignupStrategy = require('./local-signup')
const localLoginStrategy = require('./local-login')

module.exports = {
  setup(passport) {
    passport.use('local-signup', localSignupStrategy)
    passport.use('local-login', localLoginStrategy)
  },
}
