import React from 'react';
import { fetchAllEvents, deleteEvent } from '../http/productApi';
import { Button, Container, Spinner, Table, Pagination } from 'react-bootstrap';
import CreateEvent from '../components/modals/CreateEvent';

// количество товаров на страницу

const AdminEvent = () => {
  const [events, setEvents] = React.useState([]); // список загруженных товаров
  const [fetching, setFetching] = React.useState(true); // загрузка списка товаров с сервера
  const [createShow, setCreateShow] = React.useState(false); // модальное окно создания товара

  // для обновления списка после добавления, редактирования, удаления — изменяем состояние
  const [change, setChange] = React.useState(true);
  // id товара, который будем редактировать — для передачи в <UpdateProduct id={…} />
  const [event, setEvent] = React.useState('');

  const handleUpdateClick = (id) => {
    setEvent(id);
  };

  const handleDeleteClick = (id) => {
    deleteEvent(id)
      .then((data) => {
        setChange(!change);
        alert(`Товар «${data.name}» удален`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  React.useEffect(() => {
    fetchAllEvents()
      .then((data) => setEvents(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Мероприятия</h1>
      <Button onClick={() => setCreateShow(true)}>Создать мероприятие</Button>
      <CreateEvent show={createShow} setShow={setCreateShow} setChange={setChange} />

      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Фото</th>
              <th>Место</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {events.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>
                  {item.image && (
                    <a href={process.env.REACT_APP_IMG_URL + item.image} target="_blank">
                      фото
                    </a>
                  )}
                </td>
                <td>{item.place}</td>
                <td>
                  <Button variant="success" size="sm" onClick={() => handleUpdateClick(item.id)}>
                    Редактировать
                  </Button>
                </td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(item.id)}>
                    Удалить
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AdminEvent;
