import { useState, useEffect } from 'react'

export default function useLoader (getData: any, api: any): {isLoading: boolean, loadData: any} {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    getData()
  }, [])

  async function loadData (): Promise<any> {
    setIsLoading(true)
    const data = await api()
    setIsLoading(false)
    return data
  }

  return { isLoading, loadData }
}
