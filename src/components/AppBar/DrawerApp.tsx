import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import { NavLink } from 'react-router-dom'
import './index.css'

const DrawerApp = (props) => {

  const navbar = [
    {to: '/', primary:'Главная'},
    {to: '/office', primary:'Офисы'},
    {to: '/rooms', primary:'Комнаты'},
    {to: '/notice', primary:'Уведомления'},
    {to: '/item-room', primary:'Предметы в комнате'},
    {to: '/invite', primary:'Приглашения'},
    {to: '/reserves', primary:'Бронирования'},
  ]

  return (
        <Drawer
          anchor='left'
          open={props.open}
          onClose={props.handleClose}
        >
          <Box sx={{ width: 250 }} role='presentation'>
            <List>
              { navbar.map((el)=> (
                <NavLink 
                  key={el.primary}
                  to={el.to} 
                  style={{ textDecoration: 'none' }}
                  onClick={props.handleClose}
                >
                  <ListItem button>
                    <ListItemText primary={el.primary} />
                  </ListItem>
                </NavLink>))
              }
            </List>
          </Box>
        </Drawer>
  )
}

export default DrawerApp
