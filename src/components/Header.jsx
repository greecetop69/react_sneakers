import { Link } from 'react-router-dom';
import React from 'react';

function Header({ onClickCart, price, count }) {

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="mainTitle d-flex align-center">
          <img width={40} height={40} src="img/logo.png" alt="Logotype" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>

      <ul className="d-flex">
        <li onClick={onClickCart} className="mr-30 cu-p">
          {count}
          <img width={18} height={18} src="img/cart.svg" alt="Корзина" />
          <span>{price} ₽</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favorites">
            <img width={18} height={18} src="img/heart.svg" alt="Закладки" />
          </Link>

        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="Пользователь" />
          </Link>

        </li>
      </ul>
    </header >
  )
}

export default Header;