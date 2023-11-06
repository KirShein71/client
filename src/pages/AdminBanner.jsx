import React from 'react';
import { fetchAllProjects } from '../http/productApi';
import { Button, Container, Spinner, Table } from 'react-bootstrap';
import CreateBanner from '../components/modals/CreateBanner';

// количество товаров на страницу

const AdminBanner = () => {
  const [projects, setProjects] = React.useState([]); // список загруженных товаров
  const [fetching, setFetching] = React.useState(true);
  const [createShow, setCreateShow] = React.useState(false);
  const [change, setChange] = React.useState(true);

  React.useEffect(() => {
    fetchAllProjects()
      .then((data) => setProjects(data))
      .finally(() => setFetching(false));
  }, [change]);

  if (fetching) {
    return <Spinner animation="border" />;
  }
  return (
    <div className="projectlist">
      <button className="projectlist__button">Все проекты</button>
      <CreateBanner show={createShow} setShow={setCreateShow} setChange={setChange} />
      <div className="projectlist__buttons">
        <button onClick={() => setCreateShow(true)} className="projectlist__button">
          Добавить проект
        </button>
        <button className="projectlist__button">Проектирование</button>
        <button className="projectlist__button">Закупки</button>
      </div>
      <Table bordered hover size="sm" className="mt-3">
        <thead>
          <tr>
            <th>Название</th>
            <th>Дата договора</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.agreement_date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminBanner;
