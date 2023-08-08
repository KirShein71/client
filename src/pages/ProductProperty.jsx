import React from 'react';
import { fetchOneProduct } from '../http/productApi';
import { useParams } from 'react-router-dom';
import { append } from '../http/basketApi';
import { AppContext } from '../components/AppContext';
import Loading from '../components/Loading';

const ProductProperty = ({ data }) => {
  const { id } = useParams();
  const { basket } = React.useContext(AppContext);
  const [product, setProduct] = React.useState();
  const [isAdded, setIsAdded] = React.useState(true);

  React.useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
  }, [id]);

  const clickToCart = (productId) => {
    append(productId)
      .then((data) => {
        basket.product = data.product;
        setIsAdded(false);
      })
      .catch((error) => alert(error.response.data.message));
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="productproperty">
      <div className="container">
        <div className="productproperty__content">
          <div className="productproperty__information">
            <h1 className="productproperty__title">{product.name}</h1>
            <h2 className="productproperty__title">{product.price} ₽</h2>
            <div className="productproperty__characteristics">
              {product.props.map((item) => (
                <div className="characteristics" key={item.id}>
                  <h2 className="productproperty__subtitle">{item.name}:</h2>
                  <p className="productproperty__text">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="productproperty__image">
            <img src={process.env.REACT_APP_IMG_URL + product.image} alt="wine" />
          </div>
        </div>
        {isAdded ? (
          <button
            onClick={() => clickToCart(product.id)}
            type="button"
            className="productproperty__button">
            В корзину
          </button>
        ) : (
          <button className="productproperty-button__add">В корзине</button>
        )}
      </div>
    </div>
  );
};

export default ProductProperty;
