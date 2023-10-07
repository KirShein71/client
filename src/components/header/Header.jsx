import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AppContext } from '../AppContext';

const Header = observer(() => {
  const { basket } = React.useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activePage, setActivePage] = React.useState('');

  const handleClickScroll = () => {
    const element = document.getElementById('event');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleClickEvent = () => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        handleClickScroll();
      }, 100);
    } else {
      setTimeout(() => {
        handleClickScroll();
      }, 100);
    }
  };

  return (
    <div className="header">
      <div className="container">
        <div className="header__sidebar">
          <Link to="/">
            <h1 className="header__title">
              <img src="./img/ruswine.png" alt="russian__wine" />
            </h1>
          </Link>
          <div className="header__working">
            <p className="header-text__up">Мы рады вас видеть каждый день </p>
            <p className="header-text__down">С 11:00 до 22:00</p>
          </div>
        </div>
        <div className="header__content">
          <Link to="/">
            <div className={activePage === '/' ? 'active' : ''} onClick={() => setActivePage('/')}>
              Главная
            </div>
          </Link>
          <Link to="/catalog">
            <div
              className={activePage === 'catalog' ? 'active' : ''}
              onClick={() => setActivePage('catalog')}>
              Каталог
            </div>
          </Link>
          <div onClick={handleClickEvent} className="header__item">
            Мероприятия
          </div>

          <Link to="/basket">
            <div
              className={activePage === 'basket' ? 'active' : ''}
              onClick={() => setActivePage('basket')}>
              Корзина {!!basket.count && <span>({basket.count})</span>}
            </div>
          </Link>
        </div>
        <div className="header__line"></div>
      </div>
    </div>
  );
});

export default Header;
