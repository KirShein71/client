import React from 'react';
import { userGetAll as getAllOrders } from '../http/orderApi';
import { Container, Spinner } from 'react-bootstrap';
import Orders from '../components/Orders';

const UserOrders = () => {
  const [orders, setOrders] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);

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
      <h1>Ваши заказы</h1>
      <Orders items={orders} admin={false} />
    </Container>
  );
};

export default UserOrders;
