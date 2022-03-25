import { IMyBookings } from '@/interfaces/Ibooking'
import IItemsRoom from '@/interfaces/IItemsRoom'
import { IOffice } from '@/interfaces/IOffice'
import IPagination from '@/interfaces/IPagination'
import IRoom from '@/interfaces/IRoom'
import IUser, { IUsersBookings } from '@/interfaces/IUser'
import axios from 'axios'
import { runtimeConfig } from '../config'

const API_URL = runtimeConfig.API_URL

class ItemRoomApi {
  
  async create(title: string, description: string, isActive: boolean, count:number, roomId:number): Promise<IRoom> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    try {

    } catch(e) {
      console.log(e);
    }
    const newRoom = await axios.post('http://garpixams.staging.garpix.com/api/v1/room_items/create',
      {
        title: `${title}`,
        description: `${description}`,
        isActive: `${isActive}`,
        count: `${count}`,
        roomId: { id: `${roomId}` }
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

  async get(pagination?: IPagination): Promise<IItemsRoom[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    try {

    } catch(e) {
      console.log(e);
    }
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
}

const apiItemRoom = new ItemRoomApi()

export {
    apiItemRoom
}
