import React from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AllBookings from './components/Booking/AllBookings'
import ItemsRoom from './components/ItemsRoom/ItemsRoom'
import Invite from './components/Invite/Invite'
import BookingNotice from './components/BookingNotice/BookingNotice'
import CustomAppBar from './components/AppBar/AppBar'

const App = (): React.ReactElement => (
  <Routes>
    <Route path='/' element={<CustomAppBar />}>
      <Route index element={<>Главная</>} />
      <Route path='reserves' element={<AllBookings />} />
      <Route path='item-room' element={<ItemsRoom />} />
      <Route path='invite' element={<Invite />} />
      <Route path='notice' element={<BookingNotice startDate='2022-03-20T12:03:47.924Z' endDate='2022-03-20T12:30:47.924Z' />} />
      <Route path='*' element={<>Главная</>} />
    </Route>
  </Routes>
)

export default App
