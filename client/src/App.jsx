import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Room from './page/Room'
import CreateRoom from './page/CreateRoom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/room/:uniqueId' element={<Room/>}/>
      <Route path='/create-room' element={<CreateRoom/>}/>
      {/* <Route path='/' element={<Home/>}/> */}
    </Routes>
  )
}

export default App