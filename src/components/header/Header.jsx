import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { AppContext } from '../AppContext';

const Header = observer(() => {
  const { basket } = React.useContext(AppContext);
  const handleClickScroll = () => {
    const element = document.getElementById('event');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="header">
      <div className="container">
        <div className="header__sidebar">
          <Link to="/">
            <h1 className="header__title">
              Русское<span>Вино</span>
            </h1>
          </Link>
          <div className="header__working">
            <p className="header-text__up">Мы рады Вас видеть каждый день </p>
            <p className="header-text__down">С 11:00 до 22:00</p>
          </div>
        </div>
        <div className="header__content">
          <Link to="/">
            <div className="header__item">Главная</div>
          </Link>
          <Link to="/catalog">
            <div className="header__item">Каталог</div>
          </Link>
          <div onClick={handleClickScroll} className="header__item">
            Мероприятия
          </div>

          <Link to="/basket">
            <div className="header__item">
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
