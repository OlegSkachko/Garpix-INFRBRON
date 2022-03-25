import { apiOffice } from '@/api/OfficeApi'
import React, { ChangeEvent, useState } from 'react'
import ErrorMessage from '../SnackBars/ErrorMessage'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const NewOffice = ({open, handleClose}) => {
  const [progress, setProgress] = useState<string>('')
  const [alert, setAlert] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));



  function getInput (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string): void {
    const log = e.target.value
    
    switch (type) {
      case 'title':
        setTitle(log)
        console.log('title',log);
        
        break
      case 'adress':
        setAddress(log)
        console.log('adress',log);
        break
    }
  }

  async function createOffice (): Promise<void> {
    console.log(title,address)
      const {newOffice, err} = await apiOffice.create(title, address)
      console.log(newOffice)
      if(newOffice) {
        setAlert(true)
        setProgress('success')
        console.log("успешно"); 
      }
      if(err) {
        setAlert(true)
        setProgress('error')
        console.log("ошибочка");
      }
    
  }

  return (<>
  <ErrorMessage progress={progress} alert={alert} setAlert={setAlert}/>
  <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Создание офиса"}
        </DialogTitle>
          <DialogContent>
            <TextField sx={{ mt:2}}
              fullWidth
              value={title} 
              required 
              onChange={(e) => getInput(e, 'title')}
              label="Введите название офиса" 
              variant="outlined"
            />
              <TextField sx={{ mt:2}}
              fullWidth
              value={address} 
              required 
              onChange={(e) => getInput(e, 'adress')}
              label="Укажите адрес" 
              variant="outlined"
            />
          </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            выйти
          </Button>
          <Button  onClick={createOffice} autoFocus>
            создать офис
          </Button>
        </DialogActions>
      </Dialog>
  </>
   
  )
}

export default NewOffice


