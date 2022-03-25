import IPagination, { IUsePagTypes } from '@/interfaces/IPagination'
import { useState, useEffect, useMemo, useRef } from 'react'
import useLoader from './useLoader'


export default function usePagination (api: any, type?: string): IUsePagTypes {
  const [size, setSize] = useState<number>(3)
  const [pageNumber, setPageNumber] = useState<number>(0)
  const [filter, setFilter] = useState<string>('title,asc')
  const [totalPages, setTotalPages] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [data, setData] = useState<any[]>([])
  const refTotal = useRef(null)
  const memoizedValue = useMemo(() => computePag(size, pageNumber, filter), [size, pageNumber, filter])
  const { isLoading, loadData } = useLoader(refresh, api, memoizedValue)

  function computePag (size: number, pageNumber: number, filter: string): IPagination {
    return { pageNumber, size, sort: [filter] }
  }

  useEffect(() => {
    refresh().catch((e) => console.log(e))
  }, [pageNumber])

  async function refresh (): Promise<void> {
    const data = await loadData()
    setData(data?.result)
    setTotalPages(data?.totalPages)
    setTotalItems(data?.totalItems)
    setPageNumber(0)
  }

  return {
    totalPages,
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
