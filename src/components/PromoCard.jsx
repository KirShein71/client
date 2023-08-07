import React from 'react';

import { useNavigate } from 'react-router-dom';

const PromoCard = ({ data }) => {
  const navigate = useNavigate();

  const addToProperty = () => {
    navigate(`/productproperty/${data.id}`);
  };
  return (
    <div className="promocard">
      <div className="promocard__content" onClick={addToProperty}>
        <div className="promocard__img">
          <img src={process.env.REACT_APP_IMG_URL + data.image} alt="wine" />
        </div>
        <div className="promocard__title">{data.name}</div>
        <div className="promocard__price">{data.price} ₽</div>
      </div>
    </div>
  );
};

export default PromoCard;
