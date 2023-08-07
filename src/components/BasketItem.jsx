import React from 'react';
import { observer } from 'mobx-react';

const BasketItem = ({ name, price, quantity, remove, decrement, id, increment }) => {
  const isCountDisabled = quantity <= 1;
  return (
    <div className="basketitems">
      <div className="basketitems__delete">
        <img src="./img/delete.png" alt="delete" onClick={() => remove(id)} />
      </div>
      <div className="basketitems__content">
        <div className="cart-card__img">
          <img width={150} height={200} src="./img/winebasket.png" alt="image__vine" />
        </div>
        <div className="basketitems__information">
          <div className="basketitems__name">{name}</div>
          <div className="basketitems__quantity">
            <button
              onClick={() => decrement(id)}
              disabled={isCountDisabled}
              className="basketitems__quatity-minus">
              <img src="./img/minus.png" alt="minus" />
            </button>
            <div className="basketitems__quatity-total">{quantity}</div>
            <button onClick={() => increment(id)} className="basketitems__quatity-plus">
              <img src="./img/plus.png" alt="plus" />
            </button>
          </div>
          <div className="basketitems__price">{price * quantity} ₽</div>
        </div>
      </div>
    </div>
  );
};

export default observer(BasketItem);
