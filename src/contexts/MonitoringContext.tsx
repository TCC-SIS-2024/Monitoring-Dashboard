import {createContext, ReactNode, useCallback, useState} from "react";
import {HistorizedDataParams, HistoryService} from "../services/history.ts";

interface MonitoringContextType {
  startMonitoring: () => Promise<void>;
  switchRealTime: (switchValue: boolean) => Promise<void>;
  isMonitoring: boolean;
  isRealTime: boolean
  getHistorizedData: (params: HistorizedDataParams) => Promise<any>
}

interface MonitoringProviderProps {
  children: ReactNode
}

export const MonitoringContext = createContext({} as MonitoringContextType)

export function MonitoringProvider({children}: Readonly<MonitoringProviderProps>) {
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false)
  const [isRealTime, setIsRealTime] = useState<boolean>(true)
  const historyService = new HistoryService()

  const startMonitoring = useCallback(async () => {
    setIsMonitoring(true)
  }, [])

  const switchRealTime = useCallback(async (switchValue: boolean) => {
    setIsRealTime(switchValue)
  }, [])

  const getHistorizedData = useCallback(async ({opcuaServerHost, opcuaServerPort, startDate, endDate}: HistorizedDataParams) => {
    return await historyService.getHistorizedData({opcuaServerHost, opcuaServerPort, startDate, endDate})
  }, [])

  return (
    <MonitoringContext.Provider value={{startMonitoring, isMonitoring, isRealTime, switchRealTime, getHistorizedData}}>
      {children}
    </MonitoringContext.Provider>
  )
}

