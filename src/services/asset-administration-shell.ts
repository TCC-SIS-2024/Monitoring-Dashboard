import {PaginationSearchParams, Service} from "../interfaces/service.ts";
import {api} from "../lib/axios.ts";

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
}