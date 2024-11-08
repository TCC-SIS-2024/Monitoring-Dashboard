import {HistoricalDataService} from "../interfaces/Service.ts";
import {api} from "../lib/axios.ts";

export interface HistorizedDataParams {
  opcuaServerHost: string
  opcuaServerPort: number
  startDate: string
  endDate: string
}

export class HistoryService implements HistoricalDataService {

  async getHistorizedData({opcuaServerHost, opcuaServerPort, startDate, endDate}: HistorizedDataParams): Promise<any> {
    try {
      const response = await api.get('histories/', {
        params: {
          opcua_server_host: opcuaServerHost,
          opcua_server_port: opcuaServerPort,
          start_date: startDate,
          end_date: endDate,
        }
      })
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}