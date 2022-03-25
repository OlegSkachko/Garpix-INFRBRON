import { IMyBookings } from '@/interfaces/Ibooking'
import IItemsRoom from '@/interfaces/IItemsRoom'
import { IOffice } from '@/interfaces/IOffice'
import IPagination from '@/interfaces/IPagination'
import IRoom from '@/interfaces/IRoom'
import IUser, { IUsersBookings } from '@/interfaces/IUser'
import axios from 'axios'
import { runtimeConfig } from '../config'

const API_URL = runtimeConfig.API_URL

class RoomApi {

    async create(title: string, description: string, isActive: boolean, color:string): Promise<any> {
        const accessToken = localStorage.getItem('access_token') ?? ''
        let newRoom
        let error
        try {
          newRoom = await axios.post(`${API_URL}/rooms/create`,
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
        } catch (e) {
          error = e
        }
        console.log(newRoom)
        return {newRoom,  error}
    
    }

    async get(pagination?: IPagination): Promise<any> {
        const accessToken = localStorage.getItem('access_token') ?? ''
        let data
        let errMessage
        try {
        data = await axios.post(`${API_URL}/rooms/read`,
          { ...pagination }
          ,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }).then((response) => response.data)
        } catch (e) {
          errMessage = e
        }
        console.log(data)
        return data
    }

    

}

const apiRoom = new RoomApi()

export {
    apiRoom
}
