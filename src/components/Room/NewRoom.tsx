import { apiRoom } from '@/api/RoomApi'
import React, { ChangeEvent, useRef, useState } from 'react'
import ErrorMessage from '../SnackBars/ErrorMessage'
import Add from './Add'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const NewRoom = () => {

  const [progress, setProgress] = useState<string>('')
  const [alert, setAlert] = useState<boolean>(false)
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [color, setColor] = useState<string>('#ffffff')
  const [isActive, setIsActive] = useState(false);
  
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnChange = () => {
    setIsActive(!isActive);
  };

  
  function getInput (e: ChangeEvent<HTMLInputElement>, type: string): void {
    const log = e.target?.value
    
    switch (type) {
      case 'title':
        setTitle(log)
        break
      case 'description':
        setDescription(log)
        break
      case 'color':
        setColor(log)
        break
    }
  }

  async function createRoom(): Promise<void> {
    const {newRoom,  error} = await apiRoom.create(title, description, isActive, color)
    if(newRoom) {
      setAlert(true)
      setProgress('success')
    }
    if(error) {
      setAlert(true)
      setProgress('error')
    }
    
  }

  return (<>  <ErrorMessage progress={progress} alert={alert} setAlert={setAlert}/>
  <Add open={handleClickOpen}/>
<div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
      
        <input onChange={(e) => getInput(e, 'title')} placeholder='Введите название' />
<input onChange={(e) => getInput(e, 'description')} placeholder='Опишите комнату' />
Комната активна? <input type='checkbox' checked={isActive} onChange={handleOnChange}/>
  выберите цвет: <input type='color' onChange={(e) => getInput(e, 'color')}/>
<button onClick={createRoom}>создать комнату</button>

      </Dialog>
    </div>
  </>
    
  )
}

export default NewRoom





