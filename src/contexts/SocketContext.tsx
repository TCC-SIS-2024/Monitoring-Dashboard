import {createContext, ReactNode, useEffect, useState} from "react"
import {socketIoClient} from "../lib/socketio"
import {SensorData} from "../interfaces/SensorData"
import {useMonitoring} from "../hooks/useMonitoring.tsx";

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
  const {isRealTime} = useMonitoring()

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
    if (isRealTime) {
      console.info("Connecting to socket...");
      socketIoClient.connect();
      socketIoClient.on('connect', onConnected)
      socketIoClient.on('disconnect', onDisconnected)
      socketIoClient.on('sensor_data', onSensorData)
    } else {
      console.info("Disconnecting from socket...");
      socketIoClient.disconnect();
    }

  }, [isRealTime])

  return (
    <SocketContext.Provider value={{ isConnected, sensorData }}>
      {children}
    </SocketContext.Provider>
  )
}