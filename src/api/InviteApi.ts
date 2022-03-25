import { IMyBookings } from '@/interfaces/Ibooking'
import IItemsRoom from '@/interfaces/IItemsRoom'
import { IOffice } from '@/interfaces/IOffice'
import IPagination from '@/interfaces/IPagination'
import IRoom from '@/interfaces/IRoom'
import IUser, { IUsersBookings } from '@/interfaces/IUser'
import axios from 'axios'
import { runtimeConfig } from '../config'

const API_URL = runtimeConfig.API_URL

class InviteApi {

    async create(userId: string, bookingId: string): Promise<IItemsRoom> {
        const accessToken = localStorage.getItem('access_token') ?? ''
        try {

        } catch(e) {
          console.log(e);
        }
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

const apiInvite = new InviteApi()

export {
    apiInvite
}
