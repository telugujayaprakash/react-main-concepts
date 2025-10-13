import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
import Cart from './Components/Cart'
import Productcard from './Components/Productcard'
import Signup from './Components/Signup'
import { Toaster } from 'react-hot-toast'

function App () {
  return (
    <>
      <div>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<HomePage />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path={'/login'} element={<Login />} />
            <Route path={'/signup'} element={<Signup />} />
            <Route path={'/product/:id'} element={<Productcard />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
