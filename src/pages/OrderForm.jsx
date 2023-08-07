import React, { useState } from 'react';

function OrderForm() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerNumber, setCustomerNumber] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('customerName', customerName);
    formData.append('customerNumber', customerNumber);

    fetch('/sendOrder', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Заказ успешно отправлен!');
        setProductName('');
        setQuantity('');
        setPrice('');
        setCustomerName('');
        setCustomerNumber('');
      })
      .catch((error) => {
        console.error('Ошибка при отправке заказа:', error);
        alert('Ошибка при отправке заказа!');
      });
  };

  return (
    <div>
      <h1>Отправка заказа</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="productName">Наименование товара:</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          required
        />
        <br />

        <label htmlFor="quantity">Количество:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <br />

        <label htmlFor="price">Цена:</label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br />

        <label htmlFor="customerName">Имя заказчика:</label>
        <input
          type="text"
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          required
        />
        <br />

        <label htmlFor="customerNumber">Номер заказчика:</label>
        <input
          type="text"
          id="customerNumber"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
          required
        />
        <br />

        <button type="submit">Отправить заказ</button>
      </form>
    </div>
  );
}

export default OrderForm;
