export interface IPagTypes {
    arrayPages: number[]
    setPageNumber: (value:any)=>any
    pageNumber: number
    refTotal:React.MutableRefObject<null> 
    totalItems: number
    amount: (value:any)=>any
    sort: (value:any)=>any
}

export default interface IPagination {
    pageNumber: number
    size: number
    sort: string[]
}