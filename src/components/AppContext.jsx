import React from 'react';
import ProductStore from '../store/productStore';
import UserStore from '../store/userStore';
import BasketStore from '../store/basketStore';
import EventStore from '../store/eventStore';
import BannerStore from '../store/bannerStore';

const AppContext = React.createContext();

// контекст, который будем передавать
const context = {
  user: new UserStore(),
  product: new ProductStore(),
  basket: new BasketStore(),
  event: new EventStore(),
  banner: new BannerStore(),
};

const AppContextProvider = (props) => {
  return <AppContext.Provider value={context}>{props.children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
