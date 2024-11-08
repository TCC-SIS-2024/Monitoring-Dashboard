import {useContext} from "react";
import {MonitoringContext} from "../contexts/MonitoringContext.tsx";
import {HistorizedDataParams} from "../services/history.ts";

export function useMonitoring() {

  const {startMonitoring, isMonitoring, isRealTime, switchRealTime, getHistorizedData} = useContext(MonitoringContext)

  async function startMonitoringData() {
    try {
      await startMonitoring()
    } catch (error) {
      console.error(error)
    }
  }

  async function switchRealTimeMonitoring(switchValue: boolean) {
    try {
      await switchRealTime(switchValue)
    } catch (error) {
      console.error(error)
    }
  }

  async function getHistorizedDataFromAAS({opcuaServerHost, opcuaServerPort, startDate, endDate}: HistorizedDataParams) {
    try {
      return await getHistorizedData({opcuaServerHost, opcuaServerPort, startDate, endDate})
    } catch (error) {
      console.error(error)
    }
  }

  return {
    getHistorizedDataFromAAS,
    isMonitoring,
    isRealTime,
    startMonitoringData,
    switchRealTimeMonitoring
  }
}