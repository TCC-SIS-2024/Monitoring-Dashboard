import {PaginationSearchParams} from "./Pagination.ts";

export interface Service {

  findAll(params: PaginationSearchParams): Promise<any>
  findById(id: any): Promise<any>
  create(payload: any): Promise<any>
  deleteById(id: any): Promise<any>
}