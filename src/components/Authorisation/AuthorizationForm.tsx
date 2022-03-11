import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import IValidationErr from '@/interfaces/authorisationTypes';
import { checkValidationLogin, checkValidationPassword } from '../helpers/authorizationHelper';


const AuthorizationForm = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validationErr, setValidationErr] = useState<IValidationErr>({email:'',password:''})
  const [isDisable, setIsDisable] = useState<boolean>(true)

  async function submit() {
    let access_token = await axios.post(
      'http://auth.garpixams.staging.garpix.com/api/v1/login', {
          username : `${login}`,
          password : `${password}`
      },
      {
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response)=>{
        let data = response.data
        localStorage.setItem('access_token',  data.access_token)
        localStorage.setItem('refresh_token', data.refresh_token)
        return data.access_token})
      .catch((error) => console.log(error))
      .finally(()=>{
        setLogin('')
        setPassword('')
      })
    console.log(access_token);
  }

  function changeDisableButton() {
    if(!validationErr.password && !validationErr.email && login.length && password.length) {
      setIsDisable(false)
    }
  }

  function getLogin(e:ChangeEvent<HTMLInputElement>) {
    setIsDisable(true)
    let log = e.target.value.toLowerCase()
    let newValidationErr = checkValidationLogin(log,validationErr)
    setValidationErr(newValidationErr)
    setLogin(log)
    changeDisableButton()
  }

  function getPassword(e:ChangeEvent<HTMLInputElement>) {
    setIsDisable(true)
    let pass = e.target.value
    let newValidationErr = checkValidationPassword(pass, validationErr)
    setValidationErr(newValidationErr)
    setPassword(pass)
    changeDisableButton()
  }


    return (
        <div>
            <h3>Sign in</h3>
            <label>
              Email address
              <h5>{validationErr.email}</h5>
              <input value={login} onChange={getLogin}></input>
            </label>
            <br/><br/>
            <label>
              Password
              <h5>{validationErr.password}</h5>
              <input value={password} onChange={getPassword}></input>
            </label>
           
            <button disabled={isDisable} onClick={submit}>авторизоваться</button>
       </div>
  
    );
};

export default AuthorizationForm;