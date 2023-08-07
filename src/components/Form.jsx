import React from 'react';
import emailjs from '@emailjs/browser';

function Form() {
  const [phone, setPhone] = React.useState('');
  const [eventName, setEventName] = React.useState('');
  const [name, setName] = React.useState('');
  const form = React.useRef();

  function handeSubmit(e) {
    e.preventDefault();
    setTimeout(() => {
      e.target.reset();
    }, 2000);
    emailjs.sendForm('service_j45r967', 'template_i46covv', form.current, 'o3Y41vXosLqszRg3W').then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      },
    );
  }

  return (
    <div className="form">
      <form ref={form} onSubmit={handeSubmit}>
        <input
          type="text"
          value={name}
          name="user_name"
          placeholder="Имя"
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
          placeholder="Номер телефона"
        />
        <input
          name="message"
          type="text"
          value={eventName}
          placeholder="Мероприятие для заказа"
          required
          onChange={(e) => setEventName(e.target.value)}
        />
        <input className="input__button" type="submit" value="Отправить" />
      </form>
    </div>
  );
}

export default Form;
