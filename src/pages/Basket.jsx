import React from 'react';
import BasketList from '../components/BasketList';

const Basket = ({ products, quantity, totalPrice }) => {
  return (
    <div className="basket">
      <BasketList products={products} quantity={quantity} totalPrice={totalPrice} />
    </div>
  );
};

export default Basket;
