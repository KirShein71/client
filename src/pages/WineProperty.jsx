import React from 'react';
import { fetchOneWine } from '../http/productApi';
import { useParams } from 'react-router-dom';
import { append } from '../http/basketApi';
import { AppContext } from '../components/AppContext';
import Loading from '../components/Loading';

const WineProperty = ({ data }) => {
  const { id } = useParams();
  const { basket } = React.useContext(AppContext);
  const [wine, setWine] = React.useState();
  const [isAdded, setIsAdded] = React.useState(true);

  React.useEffect(() => {
    fetchOneWine(id).then((data) => setWine(data));
  }, [id]);

  const clickToCart = (wineId) => {
    append(wineId)
      .then((data) => {
        basket.wine = data.wine;
        setIsAdded(false);
      })
      .catch((error) => alert(error.response.data.message));
  };

  if (!wine) {
    return <Loading />;
  }

  return (
    <div className="wineproperty">
      <div className="container">
        <div className="wineproperty__content">
          <div className="wineproperty__image">
            <img src={process.env.REACT_APP_IMG_URL + wine.image} alt="wine" />
          </div>
          <div className="wineproperty__information">
            <h1 className="wineproperty__title">{wine.name}</h1>

            <div className="wineproperty__characteristics">
              {wine.props.map((vine) => (
                <div className="characteristics" key={vine.id}>
                  <h2 className="wineproperty__subtitle">{vine.name}:</h2>
                  <p className="wineproperty__text">{vine.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {isAdded ? (
          <button
            onClick={() => clickToCart(wine.id)}
            type="button"
            className="wineproperty__button">
            В корзину
          </button>
        ) : (
          <button className="wineproperty-button__add">В корзине</button>
        )}
      </div>
    </div>
  );
};

export default WineProperty;
