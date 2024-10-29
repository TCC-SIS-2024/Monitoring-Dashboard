import {useContext} from "react";
import {MonitoringContext} from "../contexts/MonitoringContext.tsx";
import {useNavigate} from "react-router-dom";

export function useMonitoring() {

  const navigate = useNavigate()
  const {startMonitoring, isMonitoring} = useContext(MonitoringContext)

  async function startMonitoringData() {
    try {
      await startMonitoring()
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    isMonitoring,
    startMonitoringData
  }
}