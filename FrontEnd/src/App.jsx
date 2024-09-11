import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Header from './components/Header'
import Home from './pages/Home'
import Product from './pages/Product'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="bg-primary">
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/product'element={<Product />}>
              <Route path=':productId' element={<Product />}/>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App

