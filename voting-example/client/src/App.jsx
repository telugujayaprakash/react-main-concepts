import { useState } from 'react'
import Navbar from './Components/navbar.jsx'
import Events from './Components/Events.jsx'
import UploadMovies from './Components/UploadMovies.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/Event' element={<Events />} />
          <Route path='/UploadMovies' element={<UploadMovies />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
