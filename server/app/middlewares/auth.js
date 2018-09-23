const passport = require('passport')
const helper = require('../../config/passport')

module.exports = app => {
  app.use(helper.setup(passport))
}
