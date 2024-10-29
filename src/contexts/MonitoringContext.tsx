import {createContext, ReactNode, useCallback, useState} from "react";

interface MonitoringContextType {
  startMonitoring: () => Promise<void>;
  isMonitoring: boolean;
}

interface MonitoringProviderProps {
  children: ReactNode
}

export const MonitoringContext = createContext({} as MonitoringContextType)

export function MonitoringProvider({children}: Readonly<MonitoringProviderProps>) {
  const [isMonitoring, setIsMonitoring] = useState<boolean>(false)

  const startMonitoring = useCallback(async () => {
    setIsMonitoring(true)
  }, [])

  return (
    <MonitoringContext.Provider value={{startMonitoring, isMonitoring}}>
      {children}
    </MonitoringContext.Provider>
  )
}

