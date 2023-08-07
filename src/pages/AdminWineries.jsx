import React from 'react';
import { fetchWineries, deleteWinery } from '../http/productApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateWinery from '../components/modals/CreateWinery';

const AdminWineries = () => {
  const [wineries, setWineries] = React.useState(''); // список загруженных категорий
  const [fetching, setFetching] = React.useState(true); // загрузка списка категорий с сервера
  const [show, setShow] = React.useState(false); // модальное окно создания-редактирования
  // для обновления списка после добавления, редактирования, удаления — изменяем состояние
  const [change, setChange] = React.useState(false);
  // id категории, которую будем редактировать — для передачи в <EditCategory id={…} />
  const [wineryId, setWineryId] = React.useState(null);

  const handleCreateClick = () => {
    setWineryId(0);
    setShow(true);
  };

  const handleUpdateClick = (id) => {
    setWineryId(id);
    setShow(true);
  };

  const handleDeleteClick = (id) => {
    deleteWinery(id)
      .then((data) => {
        setChange(!change);
        alert(`Категория «${data.name}» удалена`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  React.useEffect(() => {
    fetchWineries()
      .then((data) => setWineries(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Категории</h1>
      <Button onClick={() => handleCreateClick()}>Создать категорию</Button>
      <CreateWinery id={wineryId} show={show} setShow={setShow} setChange={setChange} />
      {wineries.length > 0 ? (
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {wineries.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
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
      ) : (
        <p>Список категорий пустой</p>
      )}
    </Container>
  );
};

export default AdminWineries;
