import React from 'react';
import { adminGetOne as getOneOrder } from '../http/orderApi';
import { Container, Spinner } from 'react-bootstrap';
import Order from '../components/Order';
import { useParams } from 'react-router-dom';

const AdminOrder = () => {
  const { id } = useParams();
  const [order, setOrder] = React.useState(null);
  const [fetching, setFetching] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getOneOrder(id)
      .then((data) => setOrder(data))
      .catch((error) => setError(error.response.data.message))
      .finally(() => setFetching(false));
  }, [id]);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <h1>Заказ № {order.id}</h1>
      <Order data={order} admin={true} />
    </Container>
  );
};

export default AdminOrder;
