import React from 'react';

const AgeConfirm = ({ onClosedAgePopup }) => {
  return (
    <div className="ageconfirm">
      <div class="container">
        <div class="cookiesContent" id="cookiesPopup">
          <p>
            Информация на сайте не предназначена для посетителей младше 18 лет. Для доступа к ней
            подтвердите, пожалуйста, свое совершеннолетие.
          </p>
          <button onClick={onClosedAgePopup} class="accept">
            Да, мне есть 18
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgeConfirm;
