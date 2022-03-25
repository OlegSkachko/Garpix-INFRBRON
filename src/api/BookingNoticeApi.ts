import { IMyBookings } from '@/interfaces/Ibooking'
import IItemsRoom from '@/interfaces/IItemsRoom'
import { IOffice } from '@/interfaces/IOffice'
import IPagination from '@/interfaces/IPagination'
import IRoom from '@/interfaces/IRoom'
import IUser, { IUsersBookings } from '@/interfaces/IUser'
import axios from 'axios'
import { runtimeConfig } from '../config'

const API_URL = runtimeConfig.API_URL

class BookingNoticeApi {

}

const apiBookingNotice = new BookingNoticeApi()

export {
    apiBookingNotice
}
