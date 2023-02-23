import React, { useEffect } from 'react';
import './App.css';

//React-router-dom
import {Route, Routes} from "react-router-dom"

//COMPONENTS
import Home from './Components/Home/Home';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import NavBar from './Components/NavBar/NavBar';
import Products from './Components/Products/Products';
import CreateProduct from './Components/CreateProduct/CreateProduct';
import ProductDetail from './Components/ProductDetail/ProductDetail';

import IsAllowed from './Utils/isAllowed';

import UserPage from './Components/UserPage/UserPage';
import Cart from './Components/Cart/Cart';
import AdmingPage from './Components/Admin/AdminPage';

function App() {
  

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>

        <Route element={<IsAllowed />}>
          <Route path='/profile' element={<UserPage/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path='/adminPage' element={<AdmingPage/>}/>
          <Route path='/createProduct' element={<CreateProduct/>}/>
        </Route>

        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </>
    
  );
}

export default App;
