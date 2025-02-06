import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from "react-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignUpPage';
import HomePage from './Components/HomePage';
import { ChakraProvider } from '@chakra-ui/react';
import Services from './Components/services';
import Index from './Components/index';
import Order from './Components/Order';
import Products from './Components/Products';
import Stocks from './Components/Stocks';
import Users from './Components/Users';
import Viewuser from './Components/viewuser';
// import NavBar from './Components/NavBar';
import SPage from './Components/SPage';
import Warehouse from './Components/Warehouse';
import StockPage from './Components/StockPage';
import { Provider } from 'react-redux';
import store from "./Redux/store";
import { AuthProvider } from "./AuthContext";
import App from './App';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      {/* <AuthProvider>
        <Provider store={store}>
        <BrowserRouter> */} 
         <ToastContainer position="top-right" autoClose={3000} />
          <App />
        {/* </BrowserRouter>
        </Provider>
      </AuthProvider> */}
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
