import {Service} from "../interfaces/Service.ts";
import {api} from "../lib/axios.ts";
import {PaginationSearchParams} from "../interfaces/Pagination.ts";
import {undefined} from "zod";
import {Simulate} from "react-dom/test-utils";
import {CreateRoleForm} from "../types/role.ts";

export class RoleService implements Service {

  async findAll({page, pageSize, search}: PaginationSearchParams): Promise<any> {

    try {
      const response = await api.get('roles/', {
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

  async create(payload: CreateRoleForm): Promise<any> {
    try {
      const response = await api.post('roles/', {
        name: payload.name,
      })

      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  deleteById(id: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  findById(id: any): Promise<any> {
    return Promise.resolve(undefined);
  }

  updateById(id: any, body: any): Promise<any> {
    return Promise.resolve(undefined);
  }
}