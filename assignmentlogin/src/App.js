import React from 'react'
import { ToastContainer } from 'react-toastify'
import Login from './components/Login/Logins'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home/Home'
import SingleUser from './components/SingleUser/SingleUser'
import PrivateRoute from './PrivateRoute';


const App = () => {
  return (
    <div className="App">
    <ToastContainer autoClose={1500} />
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PrivateRoute />}>
        <Route path='/home' element ={<Home/>}/>
        <Route path='/update/:id' element ={<SingleUser/>}/>
      </Route>
    </Routes>
  </div>  )
}

export default App