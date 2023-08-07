import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { AppContext } from './AppContext';
import Admin from '../pages/Admin';
import Login from '../pages/Login';
import Basket from '../pages/Basket';
import Catalog from '../pages/Catalog';
import ProductProperty from '../pages/ProductProperty';
import AdminCategories from '../pages/AdminCategories';
import AdminWineries from '../pages/AdminWineries';
import AdminYears from '../pages/AdminYears';
import AdminProducts from '../pages/AdminProducts';
import AdminOrder from '../pages/AdminOrder';
import AdminOrders from '../pages/AdminOrders';
import AdminEvent from '../pages/AdminEvent';
import AdminBrand from '../pages/AdminBrand';
import AdminBanner from '../pages/AdminBanner';
import Signup from '../pages/Signup';
import Home from '../pages/Home';
import User from '../pages/User';
import UserOrders from '../pages/UserOrders';
import UserOrder from '../pages/UserOrder';
import Checkout from '../pages/Checkout';
import FullEvent from '../pages/FullEvent';
import OrderForm from '../pages/OrderForm';

const publicRoutes = [
  { path: '/', Component: Home },
  { path: '/login', Component: Login },
  { path: '/signup', Component: Signup },
  { path: '/productproperty/:id', Component: ProductProperty },
  { path: '/basket', Component: Basket },
  { path: '/catalog', Component: Catalog },
  { path: '/checkout', Component: Checkout },
  { path: '/fullevent', Component: FullEvent },
  { path: '/orderform', Component: OrderForm },
];

const authRoutes = [
  { path: '/user', Component: User },
  { path: '/user/orders', Component: UserOrders },
  { path: '/user/order/:id', Component: UserOrder },
];

const adminRoutes = [
  { path: '/admin', Component: Admin },
  { path: '/admin/orders', Component: AdminOrders },
  { path: '/admin/order/:id', Component: AdminOrder },
  { path: '/admin/categories', Component: AdminCategories },
  { path: '/admin/wineries', Component: AdminWineries },
  { path: '/admin/years', Component: AdminYears },
  { path: '/admin/products', Component: AdminProducts },
  { path: '/admin/brand', Component: AdminBrand },
  { path: '/admin/event', Component: AdminEvent },
  { path: '/admin/banner', Component: AdminBanner },
];

const AppRouter = observer(() => {
  const { user } = React.useContext(AppContext);

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {/* {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))} */}
      {user.isAdmin &&
        adminRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
    </Routes>
  );
});

export default AppRouter;
