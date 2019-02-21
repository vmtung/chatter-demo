const socketIO = require('socket.io')

module.exports = app => {
  const io = socketIO(app)

  io.on('connection', socket => {
    socket.emit('news', { hello: 'world' })
    socket.on('my other event', data => {
      console.log(data)
    })
  })
}
