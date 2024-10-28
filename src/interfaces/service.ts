export interface PaginationSearchParams {
  page: number
  pageSize: number
  search?: string
}

export interface Service {

  findAll(params: PaginationSearchParams): Promise<any>
}