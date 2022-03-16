import { IMyBookings } from '@/interfaces/Ibooking'
import axios from 'axios'

class ApiGarpix {
  async auth (login: string, password: string) {
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

  async getBookings () {
    const accessToken = localStorage.getItem('access_token')
    const bookings: IMyBookings[] = await axios.post('http://garpixams.staging.garpix.com/api/v1/reserves/read', {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data.result)
      .catch((error) => console.log(error))

    return bookings
  }

  async getItemsRoom () {
    const accessToken = localStorage.getItem('access_token')
    const itemsRoom = await axios.post('http://garpixams.staging.garpix.com/api/v1/room_items/read', {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data.result)
      .catch((error) => console.log(error))

    return itemsRoom
  }

  async getUsers () {
    const accessToken = localStorage.getItem('access_token')
    const users = await axios.post('http://auth.garpixams.staging.garpix.com/api/v1/users/read', {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      }).then((response) => response.data.result)
      .catch((error) => console.log(error))

    return users
  }

  async getUsersAndBooking () {
    const users = await this.getUsers()
    const bookings = await this.getBookings()
    return { users, bookings }
  }

  async createNewInvite (userId: string, bookingId: string) {
    const accessToken = localStorage.getItem('access_token')
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