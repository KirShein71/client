import { AppContext } from '../components/AppContext';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Card, Form, Button } from 'react-bootstrap';
import { login } from '../http/userApi';
import { observer } from 'mobx-react-lite';

const Login = observer(() => {
  const { user } = React.useContext(AppContext);
  const navigate = useNavigate();

  // если пользователь авторизован — ему здесь делать нечего
  React.useEffect(() => {
    if (user.isAdmin) navigate('/admin', { replace: true });
    if (user.isAuth) navigate('/admin', { replace: true });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value.trim();
    const data = await login(email, password);
    if (data) {
      user.login(data);
      if (user.isAdmin) navigate('/admin');
      if (user.isAuth) navigate('/admin');
    }
  };

  return (
    <Container className="d-flex justify-content-center">
      <Card style={{ width: '50%' }} className="p-2 mt-5 bg-light">
        <h3 className="m-auto">Авторизация</h3>
        <Form className="d-flex flex-column" onSubmit={handleSubmit}>
          <Form.Control name="email" className="mt-3" placeholder="Введите ваш email..." />
          <Form.Control name="password" className="mt-3" placeholder="Введите ваш пароль..." />
          <div className="d-flex justify-content-between mt-3 pl-3 pr-3">
            <Button type="submit">Войти</Button>
            <p>
              Нет аккаунта?
              <Link to="/signup">Зарегистрирутесь!</Link>
            </p>
          </div>
        </Form>
      </Card>
    </Container>
  );
});

export default Login;
