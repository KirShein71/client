import React from 'react';
import { fetchAllBanners, deleteBanner } from '../http/productApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateBanner from '../components/modals/CreateBanner';

// количество товаров на страницу

const AdminBanner = () => {
  const [banners, setBanners] = React.useState([]); // список загруженных товаров
  const [fetching, setFetching] = React.useState(true); // загрузка списка товаров с сервера
  const [createShow, setCreateShow] = React.useState(false); // модальное окно создания товара

  // для обновления списка после добавления, редактирования, удаления — изменяем состояние
  const [change, setChange] = React.useState(true);
  // id товара, который будем редактировать — для передачи в <UpdateProduct id={…} />
  const [setBanner] = React.useState('');

  const handleUpdateClick = (id) => {
    setBanner(id);
  };

  const handleDeleteClick = (id) => {
    deleteBanner(id)
      .then((data) => {
        setChange(!change);
        alert(`Баннер «${data.name}» удален`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  React.useEffect(() => {
    fetchAllBanners()
      .then((data) => setBanners(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Баннер</h1>
      <Button onClick={() => setCreateShow(true)}>Создать баннер</Button>
      <CreateBanner show={createShow} setShow={setCreateShow} setChange={setChange} />

      <div>
        <Table bordered hover size="sm" className="mt-3">
          <thead>
            <tr>
              <th>Фото</th>
              <th>Редактировать</th>
              <th>Удалить</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image && (
                    <a
                      href={process.env.REACT_APP_IMG_URL + item.image}
                      target="_blank"
                      rel="noreferrer">
                      фото
                    </a>
                  )}
                </td>
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

export default AdminBanner;
