export interface PaginationSearchParams {
  page: number
  pageSize: number
}

export interface Service {

  findAll(params: PaginationSearchParams): Promise<any>
}