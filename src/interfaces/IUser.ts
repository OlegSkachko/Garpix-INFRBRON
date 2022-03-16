import { IMyBookings } from './Ibooking'

export default interface IUser {
  email: string
  firstName: string
  id: string
  lastName: string
  username: string
}

export interface IUsersBookings {
  users: IUser[]
  bookings: IMyBookings[]
}
