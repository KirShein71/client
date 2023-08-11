import React from 'react';
import Ymap from './Ymap';

function Information() {
  return (
    <div className="information">
      <div className="container">
        <div className="information__content">
          <div className="information-contact">
            <div className="information-contact__title">Как нас найти</div>
            <div className="information-contact__map">
              <Ymap />
            </div>
            <div className="information-contact__bottom">
              <div className="information-contact__subtitle">Мы находимся по адресу:</div>
              <div className="information-contact__address">
                Санкт-Петербург, 9-линия Васильевского острова, д 36
              </div>
              <div className="information-contact__subtitle">Звоните</div>
              <a className="information-contact__telephone" href="tel:+79516825468">
                8-951-682-54-68
              </a>
              <div className="information-contact__subtitle">По вопросам сотрудничества:</div>
              <div className="information-contact__cooperation">
                <div className="cooperation__telepfone">
                  <a className="information-contact__telephone" href="tel:+7952381312">
                    8-952-381-13-12
                  </a>
                  <p className="cooperation__text"> (WhatsApp и для звонков)</p>
                </div>
                <div className="cooperation__telegram">
                  <a className="information-contact__telegramm" href="https://t.me/marystufff">
                    @marystufff
                  </a>
                  <p className="cooperation__text"> (telegram)</p>
                </div>
                <p className="cooperation__responsible">Стюф Мария Алексеевна</p>
              </div>
            </div>
          </div>
          <div className="information-social">
            <div className="information-social__title">Мы в социальных сетях</div>
            <div className="information-social__content">
              <div className="information-social__telegramm">
                <img src="./img/telegramm.png" alt="telegramm" />
                <a href="https://t.me/russianvinespb" className="information-social__subtitle">
                  Telegram
                </a>
              </div>
              <div className="information-social__line"></div>
              <div className="information-social__vk">
                <img src="./img/vk.png" alt="vkontakte" />
                <a href="https://vk.com/club211146379" className="information-social__subtitle">
                  VK
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
