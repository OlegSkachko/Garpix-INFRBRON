import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { NavLink } from 'react-router-dom'
import './index.css'

type Anchor = 'left'

const DrawerApp = (props) => {
  const [state, setState] = React.useState(false)

  const toggleDrawer =
    (open) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return
        }
        setState(open)
      }

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role='presentation'
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary='Главная' />
          </ListItem>
        </NavLink>
        <NavLink to='/notice' style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary='Уведомления' />
          </ListItem>
        </NavLink>
        <NavLink to='/item-room' style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary='Предметы в комнате' />
          </ListItem>
        </NavLink>
        <NavLink to='/invite' style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary='Приглашения' />
          </ListItem>
        </NavLink>
        <NavLink to='/reserves' style={{ textDecoration: 'none' }}>
          <ListItem button>
            <ListItemText primary='Бронирования' />
          </ListItem>
        </NavLink>
      </List>
      <Divider />
    </Box>
  )

  return (
    <div>
      <React.Fragment key='left'>
        <Drawer
          anchor='left'
          open={props.open}
          onClose={props.handleClose}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  )
}

export default DrawerApp
