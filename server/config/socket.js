const socketIO = require('socket.io')
const jwtHelpers = require('../helpers/jwt')

const userIdSocketMap = {}

module.exports = app => {
  const io = socketIO(app)

  io.on('connection', socket => {
    socket.on('map-id', data => {
      const { authToken } = data
      const user = jwtHelpers.getUserFromToken(authToken)
      const userId = user && user._id

      if (userId) {
        userIdSocketMap[userId] = socket.id
      }
    })
    socket.on('direct-chat', data => {
      const { targetId, authToken, msg } = data
      const user = jwtHelpers.getUserFromToken(authToken)
      const fromId = user && user._id

      const targetSocketId = userIdSocketMap[targetId]
      if (fromId && targetSocketId) {
        socket.broadcast.to(targetSocketId).emit('direct-chat', {
          fromId,
          msg,
        })
      }
    })
  })
}
