import { IMyBookings } from '@/interfaces/Ibooking'
import IItemsRoom from '@/interfaces/IItemsRoom'
import { IOffice } from '@/interfaces/IOffice'
import IPagination from '@/interfaces/IPagination'
import IUser, { IUsersBookings } from '@/interfaces/IUser'
import axios from 'axios'

class ApiGarpix {
  async auth (login: string, password: string): Promise<void> {
    await axios.post(
      'http://auth.garpixams.staging.garpix.com/api/v1/login', {
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
    await axios.post(
      'http://auth.garpixams.staging.garpix.com/api/v1/refresh', {
        refreshToken: `${refreshToken}`
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
      const data = response.data.result
      if(!!data) {
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
      }

    })
      .catch((error) => console.log(error))
  }

  async logout (): Promise<any> {
    const refreshToken = localStorage.getItem('refresh_token') ?? ''
    const data = await axios.post(
      'http://auth.garpixams.staging.garpix.com/api/v1/logout', {
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
    const offices = await axios.post('http://garpixams.staging.garpix.com/api/v1/reserves/read',
      { ...pagination }
      ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))
      console.log(offices);
      
    return offices
  }

  async createNewOffice (title: string, address: string): Promise<IOffice> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const itemsRoom = await axios.post('http://garpixams.staging.garpix.com/api/v1/offices/create',
      {
        title: `${title}`,
        address: `${address}`,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))

    return itemsRoom
  }

  async getBookings (pagination?: IPagination): Promise<IMyBookings[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const bookings = await axios.post('http://garpixams.staging.garpix.com/api/v1/reserves/read',
      { ...pagination }
      ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))
      console.log(bookings);
      
    return bookings
  }

  async getItemsRoom (pagination?: IPagination): Promise<IItemsRoom[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const itemsRoom = await axios.post('http://garpixams.staging.garpix.com/api/v1/room_items/read',
      { ...pagination }
    ,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data)
      .catch((error) => console.log(error))

    return itemsRoom
  }

  async getUsers (): Promise<IUser[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    const users = await axios.post('http://auth.garpixams.staging.garpix.com/api/v1/users/read', {},
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
    const itemsRoom = await axios.post('http://garpixams.staging.garpix.com/api/v1/invites/create',
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
