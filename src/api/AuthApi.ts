import axios from 'axios'

const AUTH_URL ='https://gateway.garpixams.staging.garpix.com/auth'


class AuthApi {
  async login(login: string, password: string, remember:boolean): Promise<void> {
    let error
    try {
      await axios.post(
        `${AUTH_URL}/login`, {
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
        if(remember === true) {
          localStorage.setItem('refresh_token', data.refresh_token)
        }
      })
    } catch (e) {
      error = e
    }
     return error
  }

  async refresh (): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token') ?? ''
    try {
    await axios.post(
      `${AUTH_URL}/refresh`, {
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
  } catch(e) {
    console.log(e);
    
  }
  }

  async logout (): Promise<any> {
    const refreshToken = localStorage.getItem('refresh_token') ?? ''
    try {

    } catch(e) {
      console.log(e);
    }
    const data = await axios.post(
      `${AUTH_URL}/logout`, {
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

}

const apiAuth = new AuthApi()

export {
  apiAuth
}
