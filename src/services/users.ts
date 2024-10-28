import {Service} from "../interfaces/Service.ts";
import {api} from "../lib/axios.ts";
import {PaginationSearchParams} from "../interfaces/Pagination.ts";
import {undefined} from "zod";

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

  create(): Promise<any> {
    return Promise.resolve(undefined);
  }
}