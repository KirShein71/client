import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { AppContextProvider } from './components/AppContext'


import './index.css';
import App from './App';

export const Context = createContext(null)



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppContextProvider>
            <App />
        </AppContextProvider>
   
   
  

);

