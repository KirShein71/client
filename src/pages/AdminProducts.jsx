import React from 'react';
import { fetchAllProducts, deleteProduct } from '../http/productApi';
import { Button, Container, Spinner, Table, Pagination } from 'react-bootstrap';
import CreateProduct from '../components/modals/CreateProduct';
import UpdateProduct from '../components/modals/UpdateProduct';

const AdminProducts = () => {
  const [products, setProducts] = React.useState([]); // список загруженных товаров
  const [fetching, setFetching] = React.useState(true); // загрузка списка товаров с сервера
  const [createShow, setCreateShow] = React.useState(false); // модальное окно создания товара
  const [updateShow, setUpdateShow] = React.useState(false); // модальное окно редактирования
  // для обновления списка после добавления, редактирования, удаления — изменяем состояние
  const [change, setChange] = React.useState(true);
  // id товара, который будем редактировать — для передачи в <UpdateProduct id={…} />
  const [product, setProduct] = React.useState(null);

  // текущая страница списка товаров
  const [currentPage, setCurrentPage] = React.useState(1);
  // сколько всего страниц списка товаров
  const [totalPages] = React.useState(1);

  // обработчик клика по номеру страницы
  const handlePageClick = (page) => {
    setCurrentPage(page);
    setFetching(true);
  };

  // содержимое компонента <Pagination>
  const pages = [];
  for (let page = 1; page <= totalPages; page++) {
    pages.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        activeLabel=""
        onClick={() => handlePageClick(page)}>
        {page}
      </Pagination.Item>,
    );
  }

  const handleUpdateClick = (id) => {
    setProduct(id);
    setUpdateShow(true);
  };

  const handleDeleteClick = (id) => {
    deleteProduct(id)
      .then((data) => {
        // если это последняя страница и мы удаляем на ней единственный
        // оставшийся товар — то надо перейти к предыдущей странице
        if (totalPages > 1 && products.length === 1 && currentPage === totalPages) {
          setCurrentPage(currentPage - 1);
        } else {
          setChange(!change);
        }
        alert(`Товар «${data.name}» удален`);
      })
      .catch((error) => alert(error.response.data.message));
  };

  // React.useEffect(() => {
  //   fetchAllProducts(null, null, currentPage, ADMIN_PER_PAGE)
  //     .then((data) => {
  //       setProducts(data);
  //       setTotalPages(Math.ceil(data.count / ADMIN_PER_PAGE));
  //     })
  //     .finally(() => setFetching(false));
  // }, [change, currentPage]);

  React.useEffect(() => {
    fetchAllProducts()
      .then((data) => setProducts(data.rows))
      .finally(() => setFetching(false));
  }, [change]);

  console.log(change);
  if (fetching) {
    return <Spinner animation="border" />;
  }

  return (
    <Container>
      <h1>Товары</h1>
      <Button onClick={() => setCreateShow(true)}>Создать товар</Button>
      <CreateProduct show={createShow} setShow={setCreateShow} setChange={setChange} />
      <UpdateProduct id={product} show={updateShow} setShow={setUpdateShow} setChange={setChange} />
      {products.length > 0 ? (
        <div>
          <Table bordered hover size="sm" className="mt-3">
            <thead>
              <tr>
                <th>Название</th>
                <th>Фото</th>
                <th>Категория</th>
                <th>Винодельня</th>
                <th>Год</th>
                <th>Цена</th>
                <th>Редактировать</th>
                <th>Удалить</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
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
                  <td>{item.category?.name || 'NULL'}</td>
                  <td>{item.winery?.name || 'NULL'}</td>
                  <td>{item.year?.name || 'NULL'}</td>
                  <td>{item.price}</td>
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
          {totalPages > 1 && <Pagination>{pages}</Pagination>}
        </div>
      ) : (
        <p>Список товаров пустой</p>
      )}
    </Container>
  );
};

export default AdminProducts;
