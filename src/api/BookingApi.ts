import { IMyBookings } from '@/interfaces/Ibooking'
import IItemsRoom from '@/interfaces/IItemsRoom'
import { IOffice } from '@/interfaces/IOffice'
import IPagination from '@/interfaces/IPagination'
import IRoom from '@/interfaces/IRoom'
import IUser, { IUsersBookings } from '@/interfaces/IUser'
import axios from 'axios'
import { runtimeConfig } from '../config'

const API_URL = runtimeConfig.API_URL

class BookingApi {

    async create(title: string, description: string, isActive: boolean, color:string): Promise<IRoom> {
        const accessToken = localStorage.getItem('access_token') ?? ''
        try {

        } catch(e) {
          console.log(e);
        }
        const newRoom = await axios.post('http://garpixams.staging.garpix.com/api/v1/reserves/create',
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
      try {

      } catch(e) {
        console.log(e);
      }
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
        console.log(bookings)
    
        return bookings
      }


    

}

const apiBooking = new BookingApi()

export {
    apiBooking
}
