import React from 'react';
import { Link } from 'react-router-dom';

function CartEmpty() {
  return (
    <div className="cart-empty">
      <div className="cart-empty__content">
        <div className="cart-empty__image">
          <img width={409} height={315} src="./img/empty.jpg" alt="cart_empty" />
        </div>
        <div className="cart-empty__title">Корзина пуста</div>
        <div className="cart-empty__subtitle">Но это никогда не поздно исправить :)</div>
        <Link to="/catalog">
          <button className="button__empty">В каталог товаров</button>
        </Link>
      </div>
    </div>
  );
}

export default CartEmpty;
