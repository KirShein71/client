import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { AppContext } from '../components/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../http/userApi';

const Admin = () => {
  const { user } = React.useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = (event) => {
    logout();
    user.logout();
    navigate('/login', { replace: true });
  };

  return (
    <Container>
      <h1>Панель управления</h1>
      <p>Это панель управления магазином для администратора</p>
      <ul>
        <li>
          <Link to="/admin/orders">Заказы в магазине</Link>
        </li>
        <li>
          <Link to="/admin/categories">Категории каталога</Link>
        </li>
        <li>
          <Link to="/admin/wineries">Бренды каталога</Link>
        </li>
        <li>
          <Link to="/admin/years">Год каталога</Link>
        </li>
        <li>
          <Link to="/admin/products">Товары каталога</Link>
        </li>
        <li>
          <Link to="/admin/event">Мероприятия</Link>
        </li>
        <li>
          <Link to="/admin/banner">Баннер</Link>
        </li>
      </ul>
      <Button onClick={handleLogout}>Выйти</Button>
    </Container>
  );
};

export default Admin;
