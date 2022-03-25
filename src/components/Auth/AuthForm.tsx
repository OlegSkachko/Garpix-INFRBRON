import React, { ChangeEvent, useState } from 'react'
import IValidationErr from '@/interfaces/IAuthorisation'
import { checkValidationLogin, checkValidationPassword } from '../../helpers/authHelper'
import { apiAuth } from '@/api/AuthApi'
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';
import ErrorMessage from '../SnackBars/ErrorMessage'
import './index.css'

const AuthForm: React.FC = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validationErr, setValidationErr] = useState<IValidationErr>({ email: '', password: '' })
  const [isDisable, setIsDisable] = useState<boolean>(true)
  const [remember, setRemember] = useState(false);
  const [progress, setProgress] = useState<string>('')
  const [alert, setAlert] = useState<boolean>(false)


  async function submit (): Promise<void> {
    let done = await apiAuth.login(login, password, remember)
    if(done === undefined) {
      setAlert(true)
      setProgress('success')
    } else {
      setAlert(true)
      setProgress('error')
    }
    setTimeout(()=>window.location.reload(),1500)
  }
 

  const handleOnChange = () => {
    setRemember(!remember);
  };

  function getInput (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string): void {
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
    <>
      <ErrorMessage progress={progress} alert={alert} setAlert={setAlert}/>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Garpix
          </Typography>
        </Toolbar>
      </AppBar>

      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', m: 10  }}>
          <div className='garpix' />
          <Typography sx={{ display: 'flex', alignSelf:'center' , mt:1}}>Авторизация</Typography>
          <TextField sx={{ mt:2}}
            fullWidth
            value={login} 
            required 
            error={ validationErr.email !== ''? true:false}
            onChange={(e) => getInput(e, 'login')}
            label="логин" 
            variant="outlined"
            helperText={validationErr.email}
          />
          <TextField sx={{ mt:2}}
            fullWidth
            value={password} 
            required  
            
            error = { validationErr.password !== ''? true:false}
            onChange={(e) => getInput(e, 'password')}
            label="пароль" 
            variant="outlined" 
            helperText={validationErr.password}
          /> 
         <div>
           <input type='checkbox' checked={remember} onChange={handleOnChange}/> Запомнить меня
         </div> 
          <Button sx={{ display: 'flex', alignSelf:'end', ":hover" : {backgroundColor:'lightblue' , color:'darkblue'}}}  variant="outlined"
           disabled={isDisable} onClick={submit}>войти</Button >
          </Box>
          
      </Box>
    </>

  )
}

export default AuthForm
