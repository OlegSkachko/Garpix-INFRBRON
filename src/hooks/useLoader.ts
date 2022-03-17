import IPagination from '@/interfaces/IPagination'
import { useState, useEffect } from 'react'

export default function useLoader (getData: any, api: any, pag?: IPagination): {isLoading: boolean, loadData: any} {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  async function loadData (): Promise<any> {
    setIsLoading(true)
    const data = await api(pag)
    setIsLoading(false)
    return data
  }

  return { isLoading, loadData }
}
