import React from 'react';
import { AppContext } from './AppContext';
import { increment, decrement, remove, fetchBasket } from '../http/basketApi';
import { useNavigate } from 'react-router-dom';
import BasketItem from './BasketItem';
import CartEmpty from './BasketEmpty';
import { observer } from 'mobx-react-lite';
import Loading from './Loading';

const BasketList = () => {
  const { basket } = React.useContext(AppContext);
  const [fetching, setFetching] = React.useState(false);

  const navigate = useNavigate();

  const handleIncrement = (id) => {
    setFetching(true);
    increment(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  const handleDecrement = (id) => {
    setFetching(true);
    decrement(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };

  const handleRemove = (id) => {
    setFetching(true);
    remove(id)
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
  };
  React.useEffect(() => {
    fetchBasket()
      .then((data) => (basket.products = data.products))

      .finally(() => setFetching(false));
  }, [basket]);

  if (fetching) {
    return <Loading />;
  }
  return (
    <>
      {basket.count ? (
        <>
          <div className="basketlist">
            <div className="container">
              <div className="basketlist__title">Ваши заказы</div>
              <div className="basketlist__content">
                <div className="basketlist-card__grid">
                  {basket.products.map((obj) => (
                    <BasketItem
                      key={obj.id}
                      increment={handleIncrement}
                      decrement={handleDecrement}
                      remove={handleRemove}
                      {...obj}
                    />
                  ))}
                </div>
                <div className="basketlist-total">
                  <div className="basketlist-total__title">ИТОГО:</div>
                  <div className="basketlist-total__price">{basket.sum} ₽</div>
                </div>
              </div>
              <button className="button__checkout" onClick={() => navigate('/checkout')}>
                Оформить заказ
              </button>
            </div>
          </div>
        </>
      ) : (
        <CartEmpty />
      )}
    </>
  );
};

export default observer(BasketList);
