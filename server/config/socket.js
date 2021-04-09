const socketIO = require('socket.io')
const User = require('mongoose').model('User')

module.exports = app => {
  const io = socketIO(app)

  io.on('connection', socket => {
    socket.on('direct-chat', async data => {
      const { targetId, msg } = data
      const [user, targetUser] = await Promise.all([
        User.findOne({
          socketId: socket.id,
        }),
        User.findById(targetId),
      ])
      if (user && targetUser) {
        const targetSocketId = targetUser.socketId
        socket.broadcast.to(targetSocketId).emit('direct-chat', {
          from: user,
          msg,
        })
      }
    })
  })
}
