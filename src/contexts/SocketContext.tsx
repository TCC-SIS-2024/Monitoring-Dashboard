import {createContext, ReactNode, useEffect, useState} from "react"
import {socketIoClient} from "../lib/socketio"
import {SensorData} from "../interfaces/SensorData"

interface SocketContextType {
  isConnected: boolean
  sensorData?: SensorData
}

interface SocketProviderProps {
  children: ReactNode
}

export const SocketContext = createContext({} as SocketContextType)

export function SocketProvider({ children }: SocketProviderProps) {

  const [isConnected, setIsConnected] = useState<boolean>(socketIoClient.connected)
  const [sensorData, setSensorData] = useState<SensorData>()

  function onConnected() {
    setIsConnected(true)
  }

  function onDisconnected() {
    setIsConnected(false)
  }

  function onSensorData(value: SensorData) {
    setSensorData(value)
  }

  useEffect(() => {

    socketIoClient.on('connect', onConnected)
    socketIoClient.on('disconnect', onDisconnected)
    socketIoClient.on('sensor_data', onSensorData)

    return () => {
      socketIoClient.off('connect', onConnected);
      socketIoClient.off('disconnect', onDisconnected);
      socketIoClient.off('sensor_data', onSensorData);
    };

  }, [])

  return (
    <SocketContext.Provider value={{ isConnected, sensorData }}>
      {children}
    </SocketContext.Provider>
  )
}