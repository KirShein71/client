import { observer } from 'mobx-react-lite';
import React from 'react';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { AppContext } from './AppContext';

const Year = observer((value) => {
  const { product } = React.useContext(AppContext);
  const [popupYear, setPopupYear] = React.useState(false);
  const navigate = useNavigate();

  const handleClickYear = (id) => {
    if (id === product.year) {
      product.year = null;
    } else {
      product.year = id;
    }
    // при каждом клике добавляем в историю браузера новый элемент
    const params = {};
    if (product.year) params.year = product.year;
    if (product.category) params.category = product.category;
    if (product.winery) params.winery = product.winery;
    if (product.page > 1) params.page = product.page;
    navigate({
      pathname: '/catalog',
      search: '?' + createSearchParams(params),
    });
    setPopupYear(false);
  };

  return (
    <div className="years">
      <div className="years__title" onClick={() => setPopupYear(!popupYear)}>
        Регион:
      </div>
      {popupYear && (
        <div className="years__popup">
          <ul>
            {product.years.map((years, i) => (
              <li
                key={years.id}
                active={years.id === product.year}
                className={value === i ? 'active' : ''}
                onClick={() => handleClickYear(years.id)}>
                {years.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {product.year && (
        <div className="years__selected">
          {product.years.find((year) => year.id === product.year).name}
        </div>
      )}
    </div>
  );
});

export default Year;
