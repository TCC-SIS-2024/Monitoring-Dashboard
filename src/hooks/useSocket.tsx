import { useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";

export function useSocket() {
  const { isConnected, sensorData } = useContext(SocketContext)

  return {
    isConnected,
    sensorData
  }
}