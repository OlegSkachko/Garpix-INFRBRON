import { IMyBookings } from '@/interfaces/Ibooking'
import IItemsRoom from '@/interfaces/IItemsRoom'
import { IOffice } from '@/interfaces/IOffice'
import IPagination from '@/interfaces/IPagination'
import IRoom from '@/interfaces/IRoom'
import IUser, { IUsersBookings } from '@/interfaces/IUser'
import axios from 'axios'

const URL= 'https://gateway.garpixams.staging.garpix.com/booking/'

const AUTH_URL ='https://gateway.garpixams.staging.garpix.com/auth/'


class ApiGarpix {
  async auth (login: string, password: string): Promise<void> {
    await axios.post(
      `https://gateway.garpixams.staging.garpix.com/auth/login`, {
        username: `${login}`,
        password: `${password}`
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
      const data = response.data.result
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      console.log(data.access_token)
    })
      .catch((error) => console.log(error))
  }

  async refresh (): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token') ?? ''
    console.log("refreshToken", refreshToken);
    
    await axios.post(
      `${AUTH_URL}refresh`, {
        refreshToken: `${refreshToken}`
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
      const data = response.data.result
      if (data) {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
      }
    })
      .catch((error) => console.log(error))
  }

  async logout (): Promise<any> {
    const refreshToken = localStorage.getItem('refresh_token') ?? ''
    const data = await axios.post(
      `${AUTH_URL}logout`, {
        refreshToken: `${refreshToken}`
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => response.status)
      .catch((error) => {
        console.log(error)
        return 400
      })

    return data
  }

  async getOffice (pagination?: IPagination): Promise<IOffice[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const offices = await axios.post( `${URL}offices/read`,
      { ...pagination }
      ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))
    console.log(offices)

    return offices
  }

  async createNewOffice (title: string, address: string): Promise<IOffice> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const newOffice = await axios.post('https://garpixams.staging.garpix.com/api/v1/offices/create',
      {
        title: `${title}`,
        address: `${address}`
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))
      console.log(newOffice);
    return newOffice
  }

  async getRooms (pagination?: IPagination): Promise<IRoom[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const offices = await axios.post('https://garpixams.staging.garpix.com/api/v1/rooms/read',
      { ...pagination }
      ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))
    console.log(offices)

    return offices
  }

  async createNewRoom(title: string, description: string, isActive: boolean, color:string): Promise<IRoom> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const newRoom = await axios.post('https://garpixams.staging.garpix.com/api/v1/rooms/create',
      {
        title: `${title}`,
        description: `${description}`,
        isActive: `${isActive}`,
        color: `${color}`
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))
      console.log(newRoom);
    return newRoom
  }

  async getBookings (pagination?: IPagination): Promise<IMyBookings[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const bookings = await axios.post('https://garpixams.staging.garpix.com/api/v1/reserves/read',
      { ...pagination }
      ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))
    console.log(bookings)

    return bookings
  }

  async getItemsRoom (pagination?: IPagination): Promise<IItemsRoom[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const itemsRoom = await axios.post('https://garpixams.staging.garpix.com/api/v1/room_items/read',
      { ...pagination }
      ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))
      console.log(itemsRoom)
    return itemsRoom
  }

  async getUsers (): Promise<IUser[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const users = await axios.post('https://auth.garpixams.staging.garpix.com/api/v1/users/read', {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data.result)
      .catch((error) => console.log(error))

    return users
  }

  async getUsersAndBooking (pagination?: IPagination): Promise<IUsersBookings> {
    const users = await this.getUsers()
    const bookings = await this.getBookings(pagination)
    return { users, bookings }
  }

  async createNewInvite (userId: string, bookingId: string): Promise<IItemsRoom> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const itemsRoom = await axios.post('https://garpixams.staging.garpix.com/api/v1/invites/create',
      {
        userId: `${userId}`,
        priority: 'HIGH',
        reserveId: { id: `${bookingId}` }
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))

    return itemsRoom
  }
}

const apiGarpix = new ApiGarpix()

export {
  apiGarpix
}
