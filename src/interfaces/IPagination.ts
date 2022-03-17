import { IMyBookings } from './Ibooking'

export interface IPagTypes {
  arrayPages: number[]
  setPageNumber: (value: any) => any
  pageNumber: number
  refTotal: React.MutableRefObject<null>
  totalItems: number
  amount: (value: any) => any
  sort: (value: any) => any
}

export interface IUsePagTypes {
  arrayPages: number[]
  setPageNumber: (value: any) => any
  pageNumber: number
  refTotal: React.MutableRefObject<null>
  totalItems: number
  setSize: (value: any) => any
  setFilter: (value: any) => any
  isLoading: boolean
  myBookings: IMyBookings[]
  refresh: () => Promise<void>
}

export default interface IPagination {
  pageNumber: number
  size: number
  sort: string[]
}
