import { IconTypes } from './IIcon'

export interface IMyBookings {
  title: string
  roomId: IRoomId
  userId: string
  startDate: string
  endDate: string
  isActive: boolean
  id: number
  reason: IconTypes
}

export interface IRoomId {
  title: string
  description: string
  officeId: IOfficeId
  isActive: boolean
  color: string
  id: number
}

interface IOfficeId {
  title: null | string
  address: null | string
  id: number
}
