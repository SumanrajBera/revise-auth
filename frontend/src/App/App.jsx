import React from 'react'
import { RouterProvider } from 'react-router'
import router from './app.routes'
import Navbar from '../components/Navbar'

const App = () => {
  return <RouterProvider router={router} />
}

export default App