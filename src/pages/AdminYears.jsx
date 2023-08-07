import React from 'react';
import { fetchYears, deleteYear } from '../http/productApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateYear from '../components/modals/CreateYear';

const AdminYears = () => {
  const [years, setYears] = React.useState(''); // список загруженных категорий
  const [fetching, setFetching] = React.useState(true); // загрузка списка категорий с сервера
  const [show, setShow] = React.useState(false); // модальное окно создания-редактирования
  // для обновления списка после добавления, редактирования, удаления — изменяем состояние
  const [change, setChange] = React.useState(false);
  // id категории, которую будем редактировать — для передачи в <EditCategory id={…} />
  const [yearId, setYearId] = React.useState(null);

  const handleCreateClick = () => {
    setYearId(0);
    setShow(true);
  };

  const handleUpdateClick = (id) => {
    setYearId(id);
    setShow(true);
  };

  const handleDeleteClick = (id) => {
    deleteYear(id)
      .then((data) => {
        setChange(!change);
        alert(`Категория «${data.name}» удалена`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  React.useEffect(() => {
    fetchYears()
      .then((data) => setYears(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Год</h1>
      <Button onClick={() => handleCreateClick()}>Создать год</Button>
      <CreateYear id={yearId} show={show} setShow={setShow} setChange={setChange} />
      {years.length > 0 ? (
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Название</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {years.map((item) => (
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

export default AdminYears;
