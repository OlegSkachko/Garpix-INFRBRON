import { getPagesArray } from '@/helpers/page'
import { IMyBookings } from '@/interfaces/Ibooking'
import IPagination, { IUsePagTypes } from '@/interfaces/IPagination'
import { useState, useEffect, useMemo, useRef } from 'react'
import useLoader from './useLoader'

export default function usePagination (api: any): IUsePagTypes {
  const [size, setSize] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [filter, setFilter] = useState<string>('title,asc')
  const [arrayPages, setArrayPages] = useState<number[]>([0])
  const [totalItems, setTotalItems] = useState<number>(1)
  const [myBookings, setMyBookings] = useState<IMyBookings []>([])
  const refTotal = useRef(null)
  const memoizedValue = useMemo(() => computePag(size, pageNumber, filter), [size, pageNumber, filter])
  const { isLoading, loadData } = useLoader(refresh, api, memoizedValue)

  function computePag(size: number, pageNumber: number, filter: string): IPagination {
    return { pageNumber, size, sort: [filter] }
  }

  useEffect(() => {
    refresh().catch((e) => console.log(e))
  }, [pageNumber, size, filter])

  async function refresh (): Promise<void> {
    const bookings = await loadData()
    setMyBookings(bookings?.result)
    const arr = getPagesArray(bookings?.totalPages)
    setArrayPages(arr)
    setTotalItems(bookings?.totalItems)
  }

  return {
    arrayPages,
    setPageNumber,
    pageNumber,
    refTotal,
    totalItems,
    setSize,
    setFilter,
    isLoading,
    myBookings,
    refresh
  }
}
