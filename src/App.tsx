import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AllBookings from './components/Booking/AllBookings'
import ItemsRoom from './components/ItemsRoom/ItemsRoom'
import Invite from './components/Invite/Invite'
import BookingNotice from './components/BookingNotice/BookingNotice'
import CustomAppBar from './components/AppBar/AppBar'
import Offices from './components/Office/Offices'

const App = (): React.ReactElement => (
  <Routes>
    <Route path='/' element={<CustomAppBar />}>
      <Route index element={<>Главная</>} />
      <Route path='office' element={<Offices/>} />
      <Route path='reserves' element={<AllBookings />} />
      <Route path='item-room' element={<ItemsRoom />} />
      <Route path='invite' element={<Invite />} />
      <Route path='notice' element={<BookingNotice startDate='2022-03-22T00:00:00.924Z' endDate='2022-03-22T01:00:00.924Z' />} />
      <Route path='*' element={<Navigate to="/" replace />} />
    </Route>
  </Routes>
)

export default App
