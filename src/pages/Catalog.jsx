import React from 'react';
import Categories from '../components/Categories';
import Winery from '../components/Winery';
import Year from '../components/Year';
import ProductList from '../components/ProductList';
import Loading from '../components/Loading';
import { AppContext } from '../components/AppContext';
import { fetchCategories, fetchYears, fetchAllProducts, fetchWineries } from '.././http/productApi';
import { observer } from 'mobx-react-lite';
import { useLocation, useSearchParams, Link } from 'react-router-dom';

const getSearchParams = (searchParams) => {
  let category = searchParams.get('category');
  if (category && /[1-9][0-9]*/.test(category)) {
    category = parseInt(category);
  }
  let winery = searchParams.get('winery');
  if (winery && /[1-9][0-9]*/.test(winery)) {
    winery = parseInt(winery);
  }
  let year = searchParams.get('year');
  if (year && /[1-9][0-9]*/.test(year)) {
    year = parseInt(year);
  }
  let page = searchParams.get('page');
  if (page && /[1-9][0-9]*/.test(page)) {
    page = parseInt(page);
  }
  return { category, winery, year, page };
};

const Catalog = observer(() => {
  const { product } = React.useContext(AppContext);

  const [categoriesFetching, setCategoriesFetching] = React.useState(true);
  const [wineriesFetching, setWineriesFetching] = React.useState(true);
  const [yearsFetching, setYearsFetching] = React.useState(true);
  const [productsFetching, setProductsFetching] = React.useState(true);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    fetchCategories()
      .then((data) => (product.categories = data))
      .finally(() => setCategoriesFetching(false));

    fetchWineries()
      .then((data) => (product.wineries = data))
      .finally(() => setWineriesFetching(false));
    fetchYears()
      .then((data) => (product.years = data))
      .finally(() => setYearsFetching(false));

    const { category, winery, year, page } = getSearchParams(searchParams);

    product.category = category;
    product.winery = winery;
    product.year = year;
    product.page = page ?? 1;

    fetchAllProducts(product.category, product.winery, product.year, product.page, product.limit)
      .then((data) => {
        product.products = data.rows;
        product.count = data.count;
      })
      .finally(() => setProductsFetching(false));
    // eslint-disable-next-line
  }, []);

  // При каждом клике на категорию, бренд или номер страницы — мы добавляем элемент в историю
  // браузера, ссылки в истории имеют вид /?page=1, /?page=2, /?page=3. При нажатии кнопки
  // «Назад» браузера — мы отслеживаем изменение GET-параметров и изменяем состояние хранилища.
  React.useEffect(() => {
    const { category, winery, year, page } = getSearchParams(searchParams);

    if (category || winery || year || page) {
      if (category !== product.category) {
        product.category = category;
      }
      if (winery !== product.winery) {
        product.winery = winery;
      }
      if (year !== product.year) {
        product.year = year;
      }
      if (page !== product.page) {
        product.page = page ?? 1;
      }
    } else {
      product.category = null;
      product.winery = null;
      product.year = null;
      product.page = 1;
    }
    // eslint-disable-next-line
  }, [location.search]);

  // при клике на категорию, бренд, номер страницы или при нажатии кнопки  «Назад»
  // браузера — получам с сервера список товаров, потому что это уже другой список
  React.useEffect(() => {
    setProductsFetching(true);
    fetchAllProducts(product.category, product.winery, product.year, product.page, product.limit)
      .then((data) => {
        product.products = data.rows;
        product.count = data.count;
      })
      .finally(() => setProductsFetching(false));
    // eslint-disable-next-line
  }, [product.category, product.winery, product.year, product.page]);

  return (
    <div className="catalog">
      <div className="container">
        <p className="catalog__text">
          Aктуальный ассортимент всегда можно уточнить по нашему рабочему номеру{' '}
          <a className="catalog__telephone" href="tel:+79516825468">
            8-951-682-54-68
          </a>
        </p>
        <div className="catalog__top">
          <div className="catalog__categories">
            {categoriesFetching ? <Loading /> : <Categories />}
          </div>
          <div className="catalog__wineries">{wineriesFetching ? <Loading /> : <Winery />}</div>
          <div className="catalog__years">{yearsFetching ? <Loading /> : <Year />}</div>
          <Link to="/catalog">
            <div className="catalog__reset">Сбросить</div>
          </Link>
        </div>
        <div>{productsFetching ? <Loading /> : <ProductList />}</div>
      </div>
    </div>
  );
});

export default Catalog;
