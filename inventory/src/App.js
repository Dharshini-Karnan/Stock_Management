// import React from "react";

// import SignupPage from "./Components/SignUpPage.jsx";
// import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
// import LoginPage from './Components/LoginPage';
// import HomePage from './Components/HomePage';
// import Services from './Components/services';
// import Index from './Components/index';
// import Order from './Components/Order';
// import Products from './Components/Products';
// import Stocks from './Components/Stocks';
// import Users from './Components/Users';
// import Viewuser from './Components/viewuser';
// import Warehouse from './Components/Warehouse';
// import StockPage from './Components/StockPage';
// // import AuthenticatedRoute from "./Components/AuthenticatedRoute.jsx";
// import ProtectedRoute from "./ProtectedRoute.js";
// import { AuthProvider } from "./AuthContext.js";
// import { Provider } from "react-redux";
// import store from "./Redux/store.js";
// const App = () => {
//   return (
//     // <BrowserRouter>
//     <Provider store={store}>
//     <AuthProvider>
//       <BrowserRouter>
//     <Routes> 
//       <Route path="/login" element={<LoginPage/>}/>
//       <Route path="signup" element={<SignupPage/>}/>
//       <Route path="/" element={<HomePage/>}/>

//       <Route path="/service" element={<Services/>}/>
//       <Route path="/index" element={<Index/>}/>
//       <Route path="/order" element={<Order/>}/>
//       <Route path="/products" element={<Products/>}/>
//       <Route path="/stocks" element={<Stocks/>}/> 
//       {/* <Route path="/users" element={<Users/>}/>  */}
//        <Route path="/viewuser" element={<Viewuser/>}/>
//       <Route path="/warehouse" element={<Warehouse/>}/>
//       <Route path="/stockpage" element={<StockPage/>}/>
   
       
//   <Route path="/users" element={<ProtectedRoute><Users/></ProtectedRoute>} />

//         {/* <AuthenticatedRoute path="/index" element={<Index />} />
//         <AuthenticatedRoute path="/order" element={<Order />} />
//         <AuthenticatedRoute path="/products" element={<Products />} />
//         <AuthenticatedRoute path="/stocks" element={<Stocks />} />
//         <AuthenticatedRoute path="/users" element={<Users />} />
//         <AuthenticatedRoute path="/viewuser" element={<Viewuser />} />
//         <AuthenticatedRoute path="/warehouse" element={<Warehouse />} />
//         <AuthenticatedRoute path="/stockpage" element={<StockPage />} /> */}
//         </Routes>
//         </BrowserRouter>
//         </AuthProvider>
//         </Provider>
//   );
// };

// export default App;


import React from "react";
import SignupPage from "./Components/SignUpPage.jsx";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import Services from './Components/services';
import Index from './Components/index';
import Order from './Components/Order';
import Products from './Components/Products';
import Stocks from './Components/Stocks';
import Users from './Components/Users';
import Viewuser from './Components/viewuser';
import Warehouse from './Components/Warehouse';
import StockPage from './Components/StockPage';
import ProtectedRoute from "./ProtectedRoute.js";
import { AuthProvider } from "./AuthContext.js";
import { Provider } from "react-redux";
import store from "./Redux/store.js";
import SPage from "./Components/SPage.jsx";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/service" element={<Services />} />
            <Route path="/index" element={<Index />} />
            <Route path="/order" element={<Order />} />
            <Route path="/products" element={<Products />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/users" element={<Users />} />
            <Route path="/viewuser" element={<Viewuser />} />
            <Route path="/warehouse" element={<Warehouse />} />
            <Route path="/stockpage" element={<StockPage />} />
            <Route path="/spage" element={<SPage />} />


          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  );
};

export default App;

