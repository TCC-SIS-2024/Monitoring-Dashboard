import { io } from 'socket.io-client'

export const socketIoClient = io('http://localhost:3000/')