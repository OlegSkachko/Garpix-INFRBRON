import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Combine from './pages/Combine'
import { PATHS } from './const'
import './App.css'
import AllBookings from './components/Booking/AllBookings'
import AuthorizationForm from './components/Authorisation/AuthorizationForm'

const App = ({ context }: any): React.ReactElement => (
  // <Routes>
  //   <Route
  //     path={PATHS.ALL.path}
  //     element={<Combine staticContext={context} {...PATHS.ALL} />}
  //   />
  // </Routes>
  <AuthorizationForm></AuthorizationForm>
)

export default App
