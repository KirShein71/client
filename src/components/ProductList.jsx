import React from 'react';
import { Pagination } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { AppContext } from './AppContext';
import { observer } from 'mobx-react-lite';
import { useNavigate, createSearchParams } from 'react-router-dom';
import { fetchSearch } from '../http/productApi';
import debounce from 'lodash.debounce';

const ProductList = observer(() => {
  const { product } = React.useContext(AppContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [allProducts, setAllProducts] = React.useState(product.products);
  const [filteredProducts, setFilteredProducts] = React.useState(allProducts);

  const updateSearchValue = React.useCallback(
    debounce((value) => {
      setSearchQuery(value);
    }, 250),
    [setSearchQuery],
  );

  const handleSearchInputChange = async (event) => {
    event.preventDefault();
    setSearchQuery(event.target.value);
    updateSearchValue(event.target.value);
    const allProducts = await fetchSearch(event.target.value);
    const filteredProducts = allProducts.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setFilteredProducts(filteredProducts);
  };

  React.useEffect(() => {
    setAllProducts(product.products);
  }, [product.products]);

  const handleClickPage = (page) => {
    product.page = page;
    // при каждом клике добавляем в историю браузера новый элемент
    const params = {};
    if (product.category) params.category = product.category;
    if (product.winery) params.winery = product.winery;
    if (product.year) params.year = product.year;
    if (product.page > 1) params.page = product.page;
    navigate({
      pathname: '/catalog',
      search: '?' + createSearchParams(params),
    });
  };

  const pages = [];
  for (let page = 1; page <= product.pages; page++) {
    pages.push(
      <Pagination.Item
        key={page}
        active={page === product.page}
        activeLabel=""
        onClick={() => handleClickPage(page)}>
        {page}
      </Pagination.Item>,
    );
  }

  return (
    <div className="productlist">
      <div className="productlist__search">
        <form>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Поиск..."
          />
        </form>
      </div>
      <div className="productlist__content">
        {filteredProducts.length ? (
          filteredProducts.map((item) => <ProductItem key={item.id} data={item} />)
        ) : (
          <p className="productlist__text">По вашему запросу ничего не найдено</p>
        )}
      </div>
      <Pagination>{pages}</Pagination>
    </div>
  );
});

export default ProductList;
