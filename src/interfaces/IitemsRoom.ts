import { IRoomId } from './Ibooking'

export default interface IItemsRoom {
  count: number
  created: string
  description: string
  id: number
  isActive: boolean
  modified: string
  roomId: IRoomId
  title: string
}
