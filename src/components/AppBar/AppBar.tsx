import React, { useEffect } from 'react'
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
  const [auth, setAuth] = React.useState(true)
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    const access = localStorage.getItem('access_token')
    if (access === '' || access === null) {
      setAuth(false)
    }
  })

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = (): void => {
    setAnchorEl(null)
  }

  async function logout (): Promise<void> {
    const status = await apiGarpix.logout()
    if (status === 200 || status === 400) {
      setAuth(false)
      setOpen(false)
      localStorage.setItem('access_token', '')
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
                  size='large'
                  edge='start'
                  color='inherit'
                  aria-label='menu'
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
                      aria-label='account of current user'
                      aria-controls='menu-appbar'
                      aria-haspopup='true'
                      onClick={handleMenu}
                      color='inherit'
                    >
                      <AccountCircle />
                    </IconButton>
                    <Menu
                      id='menu-appbar'
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                      keepMounted
                      transformOrigin={{
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
