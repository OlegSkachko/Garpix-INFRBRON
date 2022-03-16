import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Combine from './pages/Combine'
import { PATHS } from './const'
import './App.css'
import Invite from './components/Invite/Invite'
import AuthorizationForm from './components/Authorization/AuthorizationForm'
import Icon from './components/Icon/Icon'

const App = ({ context }: any): React.ReactElement => (
  // <Routes>
  //   <Route
  //     path={PATHS.ALL.path}
  //     element={<Combine staticContext={context} {...PATHS.ALL} />}
  //   />
  // </Routes>
  <Icon
    value='поздравление'
  />
)

export default App
