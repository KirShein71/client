import React from 'react';
import { fetchOneProduct } from '../http/productApi';
import { fetchBasket } from '../http/basketApi';
import { useNavigate, useParams } from 'react-router-dom';
import { append } from '../http/basketApi';
import { AppContext } from '../components/AppContext';
import Loading from '../components/Loading';

const ProductProperty = () => {
  const { id } = useParams();
  const { basket } = React.useContext(AppContext);
  const [product, setProduct] = React.useState();
  const [buttonText, setButtonText] = React.useState('В корзину');
  const [isAddedToCart, setIsAddedToCart] = React.useState(false);
  const navigate = useNavigate();
  const cardRef = React.useRef(null);

  React.useEffect(() => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  React.useEffect(() => {
    fetchOneProduct(id).then((data) => setProduct(data));
    fetchBasket().then((data) => (basket.products = data.products));
  }, [id]);

  const clickToCart = (productId) => {
    append(productId)
      .then((data) => {
        basket.product = data.product;
        setIsAddedToCart(true);
        setButtonText('В корзине');
      })
      .catch((error) => alert(error.response.data.message));
  };

  const goToCart = () => {
    navigate('/basket');
  };

  if (!product) {
    return <Loading />;
  }

  return (
    <div className="productproperty" ref={cardRef}>
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
        <button
          onClick={() => {
            if (isAddedToCart) {
              goToCart();
            } else {
              clickToCart(product.id);
            }
          }}
          type="button"
          className={isAddedToCart ? 'added' : ''}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default ProductProperty;
