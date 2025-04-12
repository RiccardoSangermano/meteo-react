import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom'
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import React, { useState } from 'react'
import DetailsCard from './Components/DetailsCard'

function App() {
  const [selectedCity, setSelectedCity] = useState(null)

  const handleCitySelect = (city) => {
   
    setSelectedCity(city)
  }
  return (
    <>
   <Router>
    <div className='h-100 min-vh-100 d-flex flex-column'>
        <NavBar/>
        <main className="flex-grow-1">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:cityName" element={<DetailsCard />} />
            </Routes>
        </main>
        <Footer/> 
    </div>
</Router>
    </>
  )
}

export default App
