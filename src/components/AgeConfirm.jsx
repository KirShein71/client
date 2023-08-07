import React from 'react';

function AgeConfirm({ onClosedAgePopup }) {
  return (
    <div className="ageconfirm">
      <div className="ageconfirm__content" id="ageconfirmPopup">
        <img src="./img/ageconfirm.png" alt="wine__img" />
        <p>
          Для доступа необходимо подтвердить совершеннолетний возраст. Размещённые на сайте сведения
          не являются рекламой, носят исключительно информационный характер и предназначены только
          для личного использования
        </p>
        <button onClick={onClosedAgePopup} class="accept">
          Мне испольнилось 18
        </button>
      </div>
    </div>
  );
}

export default AgeConfirm;
