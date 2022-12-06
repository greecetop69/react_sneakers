import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Drawer from './Drawer/index'
import Home from '../pages/Home'
import MainContext from '../context'



function Main({ cartItems, setCartItems, setCartOpen, cartOpen, price }) {
    const [items, setItems] = useState([])
    const [favorites, setFavorites] = useState([])
    const [searchValue, setsearchValue] = useState('')
    const [isLoading, setIsLoading] = useState(true)




    useEffect(() => {
        async function fetchData() {
            const itemsResponse = await axios.get('https://6357d07b2712d01e14107851.mockapi.io/items')
            const cartResponse = await axios.get('https://6357d07b2712d01e14107851.mockapi.io/cart')
            const favoritesResponse = await axios.get('https://6357d07b2712d01e14107851.mockapi.io/favorites')

            setIsLoading(false)
            setCartItems(cartResponse.data)
            setFavorites(favoritesResponse.data)
            setItems(itemsResponse.data)
        }
        fetchData()
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

    const onRemoveItem = (id) => {
        axios.delete(`https://6357d07b2712d01e14107851.mockapi.io/cart/${id}`)
        setCartItems((prev) => prev.filter(item => Number(item.id) !== Number(id)))
    }

    const onAddToCart = async (obj) => {
        const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
        if (findItem) {
            setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
            await axios.delete(`https://6357d07b2712d01e14107851.mockapi.io/cart/${findItem.id}`)
        }
        else {
            setCartItems(prev => [...prev, obj])
            await axios.post('https://6357d07b2712d01e14107851.mockapi.io/cart', obj)
        }
    }

    const onChangeSearchInput = (event) => {
        setsearchValue(event.target.value)
    }

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id))
    }

    return (
            <div className="wrapper clear">
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

                <Home
                    cartItems={cartItems}
                    items={items}
                    searchValue={searchValue}
                    setsearchValue={setsearchValue}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFavorite={onAddToFavorite}
                    onAddToCart={onAddToCart}
                    isLoading={isLoading}
                    isItemAdded={isItemAdded}
                />
            </div >
    );
}

export default Main;
