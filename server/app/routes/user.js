const User = require('mongoose').model('User')

module.exports = app => {
  app.route('/user/online-list').get(async (req, res) => {
    const users = await User.find({
      socketId: {
        $exists: true,
      },
    }).select({
      name: 1,
      email: 1,
      socketId: 1,
    })
    res.json(users)
  })
}
