import { Container, Spinner } from 'react-bootstrap';
import React from 'react';
import { AppContext } from '../components/AppContext';
import { userCreate, guestCreate } from '../http/orderApi';
import { fetchBasket } from '../http/basketApi';
import { check as checkAuth } from '../http/userApi';
import { Navigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const isValid = (input) => {
  let pattern;
  switch (input.name) {
    case 'name':
      pattern = /^[-а-я]{1,}$/i;
      return pattern.test(input.value.trim());
    case 'phone':
      pattern = /[0-9]{1}[0-9]{3}[0-9]{3}[0-9]{4}$/i;
      return pattern.test(input.value.trim());
    default:
      return false;
  }
};

const Checkout = () => {
  const { user, basket } = React.useContext(AppContext);
  const [fetching, setFetching] = React.useState(true); // loader, пока получаем корзину
  const [order, setOrder] = React.useState();
  const [value, setValue] = React.useState({ name: '', phone: '' });
  const [valid, setValid] = React.useState({ name: null, phone: null });
  const form = React.useRef();

  React.useEffect(() => {
    // если корзина пуста, здесь делать нечего
    fetchBasket()
      .then((data) => (basket.products = data.products))
      .finally(() => setFetching(false));
    // нужно знать, авторизован ли пользователь
    checkAuth()
      .then((data) => {
        if (data) {
          user.login(data);
        }
      })
      .catch((error) => user.logout());
  }, [basket, user]);

  if (fetching) {
    // loader, пока получаем корзину
    return <Spinner animation="border" />;
  }

  if (order) {
    // заказ был успешно оформлен
    return (
      <Container>
        <h1 className="processed__title">Заказ оформлен</h1>
        <p className="processed__text">Наш менеджер скоро позвонит для уточнения деталей.</p>
      </Container>
    );
  }

  const handleChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    setValid({ ...valid, [event.target.name]: isValid(event.target) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: event.target.name.value.trim(),
      phone: event.target.phone.value.trim(),
    });

    setValid({
      name: isValid(event.target.name),
      phone: isValid(event.target.phone),
    });
    if (valid.name && valid.phone) {
      // форма заполнена правильно, можно отправлять данные
      const body = { ...value };
      const create = user.isAuth ? userCreate : guestCreate;
      create(body).then((data) => {
        setOrder(data);
        basket.products = [];
      });
    }
    console.log(isValid);
    emailjs.sendForm('service_xaroayf', 'template_bjbchs7', form.current, '0URx16u5H2eJHAzaX').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      },
    );
  };

  return (
    <div className="checkout">
      <div className="container">
        {basket.count === 0 && <Navigate to="/basket" replace={true} />}
        <h1 className="mb-4 mt-4">Оформление заказа</h1>

        <form className="checkout__form" ref={form} noValidate onSubmit={handleSubmit}>
          <h3 className="form__title">Введите Ваши данные</h3>
          <input
            name="name"
            value={value.name}
            onChange={(e) => handleChange(e)}
            isValid={valid.name === true}
            isInvalid={valid.name === false}
            placeholder="Введите имя..."
            className="checkout__input"
          />
          <input
            name="phone"
            value={value.phone}
            onChange={(e) => handleChange(e)}
            isValid={valid.phone === true}
            isInvalid={valid.phone === false}
            placeholder="Введите номер телефона..."
            minlength="10"
            maxlength="11"
            className="checkout__input"
          />
          {basket.products.map((obj) => (
            <div>
              <input
                name="title__product"
                value={obj.name}
                onChange={(e) => handleChange(e)}
                className="input__title"
              />
              <input
                name="quantity__product"
                value={obj.quantity}
                onChange={(e) => handleChange(e)}
                className="input__price"
              />
              <input
                name="price__product"
                value={obj.price}
                onChange={(e) => handleChange(e)}
                className="input__price"
              />
            </div>
          ))}
          <button className="checkout__button" type="submit">
            Отправить
          </button>
          <p className="form__information">
            Продажа осуществляется в магазине по адресу Санкт-Петербург, 9-линия Васильевского
            острова, д 36
          </p>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
