import { observer } from 'mobx-react';
import React from 'react';
import { AppContext } from './AppContext';
import { useNavigate, createSearchParams } from 'react-router-dom';

const Categories = observer(() => {
  const { product } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [popupCategory, setPopupCategory] = React.useState(false);

  const handleClickCategories = (id) => {
    if (id === product.category) {
      product.category = null;
    } else {
      product.category = id;
    }

    // при каждом клике добавляем в историю браузера новый элемент
    const params = {};
    if (product.category) params.category = product.category;
    if (product.winery) params.winery = product.winery;
    if (product.year) params.year = product.year;
    // if (product.page > 1) params.page = product.page;
    navigate({
      pathname: '/catalog',
      search: '?' + createSearchParams(params),
    });
    setPopupCategory(false);
  };

  return (
    <div className="categories">
      <div className="categories__title" onClick={() => setPopupCategory(!popupCategory)}>
        Цвет:
      </div>
      {popupCategory && (
        <div className="categories__popup">
          <ul>
            {product.categories.map((categories, i) => (
              <li
                key={categories.id}
                active={categories.id === product.category}
                onClick={() => handleClickCategories(categories.id)}>
                {categories.name}
              </li>
            ))}
          </ul>
        </div>
      )}
      {product.category && (
        <div className="categories__selected">
          {product.categories.find((category) => category.id === product.category).name}
        </div>
      )}
    </div>
  );
});

export default Categories;
