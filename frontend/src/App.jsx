import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Routes, Route } from 'react-router-dom'
import Create from './components/Create'
import Profile from './components/Profile'
import NotFound from './components/NotFound'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/create' element={<Create />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App