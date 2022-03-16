import React, { ChangeEvent, useState } from 'react'
import IValidationErr from '@/interfaces/IAuthorisation'
import { checkValidationLogin, checkValidationPassword } from '../../helpers/authorizationHelper'
import { apiGarpix } from '@/api/ApiGarpix'

const AuthorizationForm: React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validationErr, setValidationErr] = useState<IValidationErr>({ email: '', password: '' })
  const [isDisable, setIsDisable] = useState<boolean>(true)

  async function submit (): Promise<void> {
    await apiGarpix.auth(login, password)
    setLogin('')
    setPassword('')
  }

  function getInput (e: ChangeEvent<HTMLInputElement>, type: string): void {
    setIsDisable(true)
    const log = e.target.value.toLowerCase()
    let newValidationErr
    switch (type) {
      case 'login':
        newValidationErr = checkValidationLogin(log, validationErr)
        setValidationErr(newValidationErr)
        setLogin(log)
        break
      case 'password':
        newValidationErr = checkValidationPassword(e.target.value, validationErr)
        setValidationErr(newValidationErr)
        setPassword(e.target.value)
        break
    }
    if (validationErr.password === '' && validationErr.email === '' && login.length !== 0 && password.length !== 0) {
      setIsDisable(false)
    }
  }

  return (
    <div>
      <h3>Sign in</h3>
      Email address
      <h5>{validationErr.email}</h5>
      <input
        value={login}
        onChange={(e) => getInput(e, 'login')}
      />
      <br /><br />
      Password
      <h5>{validationErr.password}</h5>
      <input
        value={password}
        type='password'
        onChange={(e) => getInput(e, 'password')}
      />
      <button disabled={isDisable} onClick={submit}>авторизоваться</button>
    </div>

  )
}

export default AuthorizationForm
