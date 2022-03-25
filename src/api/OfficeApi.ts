import { IOffice } from '@/interfaces/IOffice'
import IPagination from '@/interfaces/IPagination'
import axios from 'axios'
import { runtimeConfig } from '../config'

const API_URL = runtimeConfig.API_URL

class OfficeApi {

  async create(title: string, address: string): Promise<any> {
      const accessToken = localStorage.getItem('access_token') ?? ''
      let newOffice
      let err
      try {
          newOffice = await axios.post(`${API_URL}/offices/create`,
        {
          title: `${title}`,
          address: `${address}`
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then((response) => response.data)
       
      } catch (e) {
        err = e
      }

      if(err === undefined) {
        return err
      }

      return {newOffice, err}
    }
    
  async get(pagination?: IPagination): Promise<IOffice[]> {
    const accessToken = localStorage.getItem('access_token') ?? ''
    try {

    } catch(e) {
      console.log(e);
    }
    const offices = await axios.post(`${API_URL}/offices/read`,
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

}

const apiOffice = new OfficeApi()

export {
    apiOffice
}
