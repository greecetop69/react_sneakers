import React, { useContext } from 'react'

import axios from 'axios'
import { useEffect, useState } from 'react'
import Card from '../components/Card'
import MainContext from '../context'
import Drawer from '../components/Drawer'



function Favorites({cartItems, setCartItems, setCartOpen, cartOpen, price, onRemoveItem}) {

console.log(cartOpen)
  const [favorites, setFavorites] = useState([])
  useEffect(() => {
    axios.get('https://6357d07b2712d01e14107851.mockapi.io/favorites').then(res => {
      setFavorites(res.data)
    })
  }, [])

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`https://6357d07b2712d01e14107851.mockapi.io/favorites/${obj.id}`)
      }
      else {
        const { data } = await axios.post('https://6357d07b2712d01e14107851.mockapi.io/favorites', obj)
        setFavorites((prev) => [...prev, data])
      }
    }
    catch (error) {
      alert('не удалось добавить в фавориты')
    }
  }

  return (
    <div className="content p-40">
      {cartOpen &&
        <Drawer
          price={price}
          items={cartItems}
          onClose={() => setCartOpen(false)}
          setCartItems={setCartItems}
          cartItems={cartItems}
          onRemove={onRemoveItem}
        />
      }
      
      <div className="d-flex align-center justify-between mb-40">
        <h1 >Мои закладки</h1>
      </div>

      <div className="d-flex flex-wrap">
        {favorites.map((item, index) => (
          <Card
            key={index}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
    </div>
  )
}

export default Favorites;