import React from 'react';
import PromoCard from '../components/PromoCard';
import { AppContext } from './AppContext';
import { observer } from 'mobx-react-lite';

const PromoList = observer(() => {
  const { product } = React.useContext(AppContext);

  return (
    <div className="promolist">
      {product.products.length ? (
        product.products.map((product) => <PromoCard key={product.id} data={product} />)
      ) : (
        <p className="m-3">По вашему запросу ничего не найдено</p>
      )}
    </div>
  );
});

export default PromoList;
