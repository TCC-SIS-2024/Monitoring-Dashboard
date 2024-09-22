import { createContext, ReactNode, useCallback, useEffect, useState } from "react"
import { socketIoClient } from "../lib/socketio"
import { SensorData } from "../interfaces/SensorData"
import { useToast } from "@chakra-ui/react"

interface SocketContextType {
  isConnected: boolean
  sensorData?: SensorData
}

interface SocketProviderProps {
  children: ReactNode
}

export const SocketContext = createContext({} as SocketContextType)

export function SocketProvider({ children }: SocketProviderProps) {

  const [isConnected, setIsConneceted] = useState<boolean>(socketIoClient.connected)
  const [sensorData, setSensorData] = useState<SensorData>()

  function onConnected() {
    setIsConneceted(true)
  }

  function onDisconnected() {
    setIsConneceted(false)
  }

  function onSensorData(value: SensorData) {
    setSensorData(value)
  }

  useEffect(() => {

    socketIoClient.on('connect', onConnected)
    socketIoClient.on('disconnect', onDisconnected)
    socketIoClient.on('sensorData', onSensorData)

    return () => {
      socketIoClient.off('connect', onConnected);
      socketIoClient.off('disconnect', onDisconnected);
      socketIoClient.off('sensorData', onSensorData);
    };

  }, [])

  return (
    <SocketContext.Provider value={{ isConnected, sensorData }}>
      {children}
    </SocketContext.Provider>
  )
}