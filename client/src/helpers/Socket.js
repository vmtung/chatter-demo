import io from 'socket.io-client'
import { onAuthChanged } from './Auth'
import { axiosPost } from './AxiosWrap'

const socket = io.connect()

socket.on('connect', () => {
  onAuthChanged(isAuthed => {
    if (isAuthed) {
      axiosPost('/auth/socket', {
        socketId: socket.id,
      })
    }
  })
})

export const sendDirectMsg = (targetId, msg) => {
  socket.emit('direct-message', {
    targetId,
    msg,
  })
}
