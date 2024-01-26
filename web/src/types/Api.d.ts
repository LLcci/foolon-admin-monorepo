export interface PageRequest<T> {
  currentPage: number
  pageSize: number
  total: number
  records: T[]
}
