export default interface IRoom {
    color:	string
    description: string
    id: number
    isActive: boolean
    officeId?:OfficeRes
    title: string
}

interface OfficeRes {
    address?:string
    id?:	number
    title?:string
    }