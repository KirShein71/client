import { observer } from 'mobx-react';
import React from 'react';
import { AppContext } from './AppContext';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Brand = observer(() => {
  const { product } = React.useContext(AppContext);
  const navigate = useNavigate();

  const handleClickBrand = (id) => {
    if (id === product.brand) {
      product.brand = null;
    } else {
      product.brand = id;
    }

    // при каждом клике добавляем в историю браузера новый элемент
    const params = {};
    if (product.brand) params.brand = product.brand;
    // if (product.page > 1) params.page = product.page;
    navigate({
      pathname: '/',
      search: '?' + createSearchParams(params),
    });
  };

  return (
    <div className="brand">
      <ul>
        {product.brands.map((brands) => (
          <li
            key={brands.id}
            active={brands.id === product.brand ? 'active' : ''}
            onClick={() => handleClickBrand(brands.id)}>
            {brands.name}
          </li>
        ))}
      </ul>
    </div>
  );
});

export default Brand;
