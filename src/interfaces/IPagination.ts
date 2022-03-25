import { IMyBookings } from './Ibooking'

export interface IPagTypes {
  totalPages: number
  setPageNumber: (value: any) => any
  pageNumber: number
  refTotal: React.MutableRefObject<null>
  totalItems: number
  amount: (value: any) => any
  sort: (value: any) => any
  item?: boolean
  refresh: () => Promise<void>
}

export interface IUsePagTypes {
  totalPages: number
  setPageNumber: (value: any) => any
  pageNumber: number
  refTotal: React.MutableRefObject<null>
  totalItems: number
  setSize: (value: any) => any
  setFilter: (value: any) => any
  isLoading: boolean
  data: any[]
  refresh: () => Promise<void>
  errMessage?: string
}

export default interface IPagination {
  pageNumber: number
  size: number
  sort: string[]
}
