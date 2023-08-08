import React from 'react';
import PromoList from './PromoList';
import Brand from '../components/Brand';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';
import { AppContext } from './AppContext';
import { observer } from 'mobx-react';
import { fetchBrands, fetchPromoProducts } from '.././http/productApi';
import { useLocation, useSearchParams } from 'react-router-dom';

const getSearchParams = (searchParams) => {
  let brand = searchParams.get('brand');
  if (brand && /[1-9][0-9]*/.test(brand)) {
    brand = parseInt(brand);
  }
  return { brand };
};

const Promo = observer(() => {
  const { product } = React.useContext(AppContext);
  const [brandsFetching, setBrandsFetching] = React.useState(true);
  const [productFetching, setProductFetching] = React.useState(true);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  React.useEffect(() => {
    fetchBrands()
      .then((data) => (product.brands = data))
      .finally(() => setBrandsFetching(false));

    const { brand } = getSearchParams(searchParams);
    product.brand = brand;

    fetchPromoProducts(product.brand)
      .then((data) => {
        const filteredProducts = data.rows.filter((item) => item.brandId > 0);
        product.products = filteredProducts;
        product.count = filteredProducts.length;
      })
      .finally(() => setProductFetching(false));
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const { brand } = getSearchParams(searchParams);
    if (brand) {
      if (brand !== product.brand) {
        product.brand = brand;
      }
    } else {
      product.brand = null;
    }
    // eslint-disable-next-line
  }, [location.search]);

  React.useEffect(() => {
    setProductFetching(true);
    fetchPromoProducts(product.brand)
      .then((data) => {
        const filteredProducts = data.rows.filter((item) => item.brandId > 0);
        product.products = filteredProducts;
        product.count = filteredProducts.length;
      })
      .finally(() => setProductFetching(false));
  }, [product.brand, product]);
  return (
    <div className="promo">
      <div className="container">
        <div className="promo-category">
          <div>{brandsFetching ? <Loading /> : <Brand />}</div>
          <Link to="/catalog">
            <div className="promo__link">Весь каталог</div>
          </Link>
        </div>
        <div className="promo-content">{productFetching ? <Loading /> : <PromoList />}</div>
      </div>
    </div>
  );
});

export default Promo;
