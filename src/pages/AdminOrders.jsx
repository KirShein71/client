import { useState, useEffect } from 'react';
import React from 'react';
import { adminGetAll as getAllOrders } from '../http/orderApi';
import { Button, Container, Spinner } from 'react-bootstrap';
import Orders from '../components/Orders';
import CreateOrder from '../components/CreateOrder';

const AdminOrders = () => {
  const [orders, setOrders] = React.useState();
  const [fetching, setFetching] = React.useState(true);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    getAllOrders()
      .then((data) => setOrders(data))
      .finally(() => setFetching(false));
  }, []);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Все заказы</h1>
      <Button onClick={() => setShow(true)}>Создать заказ</Button>
      <CreateOrder show={show} setShow={setShow} />
      <Orders items={orders} admin={true} />
    </Container>
  );
};

export default AdminOrders;
