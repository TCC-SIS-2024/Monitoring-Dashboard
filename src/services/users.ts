import {PaginationSearchParams, Service} from "../interfaces/service.ts";
import {api} from "../lib/axios.ts";

export class UserService implements Service {

  async findAll({page, pageSize}: PaginationSearchParams): Promise<any> {

    try {
      const response = await api.get('users/', {
        params: {
          page: page,
          page_size: pageSize
        }
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}