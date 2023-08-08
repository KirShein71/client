import React from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const ProductItem = observer(({ data }) => {
  const navigate = useNavigate();

  const addToProperty = () => {
    navigate(`/productproperty/${data.id}`);
  };

  return (
    <div className="productitem">
      <div className="productitem__content" onClick={addToProperty}>
        <div className="productitem__img">
          <img src={process.env.REACT_APP_IMG_URL + data.image} alt="wine" />
        </div>
        <h2 className="productitem__title">{data.name}</h2>
        <h3 className="productitem__price">{data.price} ₽</h3>
      </div>
    </div>
  );
});

export default ProductItem;
