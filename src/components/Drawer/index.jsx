import axios from 'axios';
import { useEffect, useState } from 'react';
import Info from '../Info'
// import styles from './Drawer.module.scss'

function Drawer({ onClose, onRemove, setCartItems, cartItems, items = [], price }) {

    const [isOrderComplete, setOrderComplete] = useState(false)
    const [isOrderId, setOrderId] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => { document.body.classList.remove('overflow-hidden') }
    }, [])


    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('https://6357d07b2712d01e14107851.mockapi.io/orders', {
                items: cartItems,
            });
            setOrderId(data.id);
            setOrderComplete(true);
            setCartItems([]);


        } catch (error) {
            alert('Ошибка при создании заказа :(');
        }
        setIsLoading(false);
    };



    return (
        <div onClick={onClose} className="overlay">
            <div onClick={(e) => e.stopPropagation()} className="drawer d-flex flex-column">
                <h2 className="d-flex justify-between mb-30">
                    <p>Корзина</p>
                    <img onClick={onClose} className="removeBtn  cu-p" src="/img/btn-remove.svg" alt="close" />
                </h2>
                {
                    items.length > 0 ?
                        (<div className="cartLowBlock">
                            <div className="items ">
                                {items.map((obj) => (
                                    <div key={obj.id} className="cartItem d-flex align-center mb-20">
                                        <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                                        <div className="mr-20 flex">
                                            <p className="mb-5">{obj.title}</p>
                                            <b>{obj.price} ₽</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt="remove" />
                                    </div>
                                ))}

                            </div>
                            <div className="cartTotalBlock">
                                <ul>
                                    <li>
                                        <span>Итого: </span>
                                        <div></div>
                                        <b>{price} ₽</b>
                                    </li>
                                    <li>
                                        <span>Налог 5%: </span>
                                        <div></div>
                                        <b>{(price * 0.05).toFixed(2)} ₽</b>
                                    </li>
                                </ul>
                                <button onClick={onClickOrder} className="greenButton">Оформить заказ <img src="/img/arrow.svg" alt="arrow" /></button>
                            </div>
                        </div>
                        )
                        :
                        (
                            <Info
                                onClose={onClose}
                                title={isOrderComplete ? "Заказ Оформлен" : "Корзина пустая"}
                                image={isOrderComplete ? "/img/orderComplete.jpg" : "/img/empty-cart.jpg"}
                                description={isOrderComplete ? `Ваш заказ # ${isOrderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
                            />
                        )
                }
            </div>
        </div>
    )
}

export default Drawer;