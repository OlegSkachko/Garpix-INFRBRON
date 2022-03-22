import { getPagesArray } from '@/helpers/pageHelper'
import { IMyBookings } from '@/interfaces/Ibooking'
import IPagination, { IUsePagTypes } from '@/interfaces/IPagination'
import { useState, useEffect, useMemo, useRef } from 'react'
import IItemsRoom from '@/interfaces/IItemsRoom'
import useLoader from './useLoader'
import { IOffice } from '@/interfaces/IOffice'

export default function usePagination (api: any, type?:string): IUsePagTypes {
  
  const [size, setSize] = useState<number>(1)
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [filter, setFilter] = useState<string>('title,asc')
  const [arrayPages, setArrayPages] = useState<number[]>([0])
  const [totalItems, setTotalItems] = useState<number>(1)
  let data, setData
  if(type = 'IOffice') [data, setData] = useState<IOffice[]>([])
  if(type = 'IMyBookings') [data, setData] = useState<IMyBookings[]>([])
  if(type = 'IItemsRoom') [data, setData] = useState<IItemsRoom[]>([])
  const refTotal = useRef(null)
  const memoizedValue = useMemo(() => computePag(size, pageNumber, filter), [size, pageNumber, filter])
  const { isLoading, loadData } = useLoader(refresh, api, memoizedValue)

  function computePag (size: number, pageNumber: number, filter: string): IPagination {
    return { pageNumber, size, sort: [filter] }
  }

  useEffect(() => {
    refresh().catch((e) => console.log(e))
  }, [pageNumber, size, filter])

  async function refresh (): Promise<void> {
    const data = await loadData()
    setData(data?.result)
    const arr = getPagesArray(data?.totalPages)
    setArrayPages(arr)
    setTotalItems(data?.totalItems)
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
    data,
    refresh
  }
}
