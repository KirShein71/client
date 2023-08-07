import React from 'react';
import AppRouter from './components/AppRouter';
import Header from './components/header/Header';
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom';

import './scss/app.scss'


const App = () => {
  return (
    <div className='wrapper'>
        <BrowserRouter>
            <Header/>
            <AppRouter />
            <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
