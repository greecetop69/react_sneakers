import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Main from './components/Main'
import Favorites from './pages/Favorites'
import Orders from './pages/Orders'
import Header from './components/Header'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import 'macro-css'



function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartOpened, setCartOpened] = useState(false)
  const [price, setPrice] = useState(0)
  const [count, setCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [favorites, setFavorites] = useState([])



  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const countItems = cartItems.length
      const cost = cartItems.reduce((sum, obj) => obj.price + sum, 0)
      setCount(countItems)
      setPrice(cost)
    }
  }, [cartItems])




  return (
    <BrowserRouter>
      <div className="wrapper">
        <Header onClickCart={() => setCartOpen(true)} cartItems={cartItems} price={price} count={count}/>
        <Routes>
          <Route path="/" element={<Main setCartOpened={setCartOpened} cartOpen={cartOpen} setCartOpen={setCartOpen} cartItems={cartItems} setCartItems={setCartItems} price={price}/>} />
          <Route path="/favorites" element={<Favorites setCartOpened={setCartOpened} cartOpen={cartOpen} setCartOpen={setCartOpen} />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
