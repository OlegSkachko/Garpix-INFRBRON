import React, { useState, useEffect, MouseEvent } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import DrawerApp from './DrawerApp'
import { Outlet } from 'react-router-dom'
import { apiGarpix } from '@/api/ApiGarpix'
import AuthorizationForm from '../Authorization/AuthorizationForm'

const CustomAppBar: React.FC = () => {
  const [auth, setAuth] = useState<boolean>(true)
  const [open, setOpen] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  useEffect(() => {
    const access = localStorage.getItem('access_token')
    if (access === '' || access === null) {
      setAuth(false)
    }
  })
  const handleMenu = (event: MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = (): void => {
    setAnchorEl(null)
  }
  async function logout (): Promise<void> {
    const status = await apiGarpix.logout()
    if (status === 200 || status === 400) {
      setAuth(false)
      localStorage.clear()
    }
  }

  return (
    <>
      {!auth
        ? <AuthorizationForm />
        : <>
          <Box sx={{ flexGrow: 1 }}>
            <DrawerApp open={open} handleClose={() => setOpen(false)} />
            <AppBar position='static'>
              <Toolbar>
                <IconButton
                  color='inherit'
                  sx={{ mr: 2 }}
                >
                  <MenuIcon onClick={() => setOpen(true)} />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                  Garpix
                </Typography>
                {auth && (
                  <div>
                    <IconButton
                      size='large'
                      onClick={handleMenu}
                      color='inherit'
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleClose}>Мой профиль</MenuItem>
                      <MenuItem onClick={logout}>Выйти</MenuItem>
                    </Menu>
                  </div>
                )}
              </Toolbar>
            </AppBar>
          </Box>
          <Outlet />
        </>}
    </>
  )
}

export default CustomAppBar
