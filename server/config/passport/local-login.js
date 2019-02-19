const jwt = require('jsonwebtoken')
const User = require('mongoose').model('User')
const { Strategy: PassportLocalStrategy } = require('passport-local')
const jwtConfig = require('../jwt')

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
    passReqToCallback: true,
  },
  (req, email, password, done) => {
    const userData = {
      email: email.trim(),
      password: password.trim(),
    }

    // find a user by email address
    return User.findOne({ email: userData.email }, (err, user) => {
      if (err) {
        return done(err)
      }

      if (!user) {
        const error = new Error('Incorrect email or password')
        error.name = 'IncorrectCredentialsError'

        return done(error)
      }

      // check if a hashed user's password is equal to a value saved in the database
      return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        if (err) {
          return done(err)
        }

        if (!isMatch) {
          const error = new Error('Incorrect email or password')
          error.name = 'IncorrectCredentialsError'

          return done(error)
        }

        const data = {
          _id: user._id,
          email: user.email,
          name: user.name,
        }
        const payload = {
          user: data,
          date: new Date(),
        }

        // create a token string
        const token = jwt.sign(payload, jwtConfig.secret) // process.env.JWT_SECRET)

        return done(null, token, data)
      })
    })
  }
)
