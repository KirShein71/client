import React from 'react';
import { observer } from 'mobx-react';

const Promo = observer(() => {
  return (
    <div className="promo">
      <div className="container">
        <h1 className="promo__title">В этом месяце их можно забрать по цене закупки</h1>
        <div className="promo__content">
          <img src="./img/sela/5.jpg" alt="sale" />
          <img src="./img/sela/2.jpg" alt="sale" />
          <img src="./img/sela/3.jpg" alt="sale" />
          <img src="./img/sela/4.jpg" alt="sale" />
          <img src="./img/sela/1.jpg" alt="sale" />
        </div>
      </div>
    </div>
  );
});

export default Promo;
