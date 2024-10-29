import {io} from 'socket.io-client'

export const socketIoClient = io('http://0.0.0.0:8000/', {
  transports: ["websocket"]
})