import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const ProductItem = observer(({ data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = React.useRef(null);

  const addToProperty = () => {
    navigate(`/productproperty/${data.id}`, { state: { from: location.pathname } });
  };

  return (
    <div className="productitem" ref={cardRef}>
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
