import {Service} from "../interfaces/Service.ts";
import {api} from "../lib/axios.ts";
import {PaginationSearchParams} from "../interfaces/Pagination.ts";
import {
  CreateAssetAdministrationShellForm,
  UpdateAssetAdministrationShellForm
} from "../types/asset-administration-shell.ts";

export class AssetAdministrationShellService implements Service {

  async findAll({page, pageSize, search}: PaginationSearchParams): Promise<any> {

    try {
      const response = await api.get('asset-administration-shells/', {
        params: {
          page: page,
          page_size: pageSize,
          search
        }
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async deleteById(id: string): Promise<any> {
    try {
      const response = await api.delete(`asset-administration-shells/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async create(payload: CreateAssetAdministrationShellForm): Promise<any> {
    try {
      const response = await api.post('asset-administration-shells/', {
        id_short: payload.idShort,
        database_endpoint: payload.databaseEndpoint,
        aas_modeling: payload.aasModeling,
        host: payload.host,
        port: payload.port,
        active: false
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async findById(id: string): Promise<any> {
    try {
      const response = await api.get(`asset-administration-shells/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  async updateById(id: string, payload: UpdateAssetAdministrationShellForm): Promise<any> {
    try {
      const response = await api.put(`asset-administration-shells/${id}`, {
        id_short: payload.idShort,
        database_endpoint: payload.databaseEndpoint,
        aas_modeling: payload.aasModeling,
        host: payload.host,
        port: payload.port,
        active: false
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}