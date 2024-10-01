import React,{useState} from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import LoginPopUp from './components/LoginPopUp'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import Myorder from './pages/Myorder'
import Order from './pages/Order'
import Verify from './pages/Verify'
import Cart from './pages/cart'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className='overflow-hidden text-[#404040]'>
      <BrowserRouter>
        <div className="bg-primary">
          <Header setShowLogin={setShowLogin} />
          {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product'element={<Product />}>
              <Route path=':productId' element={<Product />}/>
            </Route>
            <Route path='/cart' element={<Cart />} />
            <Route path='/order' element={<Order />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/myorder' element={<Myorder />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

