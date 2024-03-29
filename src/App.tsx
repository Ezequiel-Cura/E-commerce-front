import React, { useEffect } from 'react';
import './App.css';

//React-router-dom
import {Route, Routes} from "react-router-dom"

//COMPONENTS
import Home from './Components/Home/Home';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Products from './Components/Products/Products';
import CreateProduct from './Components/CreateProduct/CreateProduct';
import ProductDetail from './Components/ProductDetail/ProductDetail';
import Promociones from './Components/Promociones/Promociones';
import Recetas from './Components/Recetas/Recetas';
import UserPage from './Components/UserPage/UserPage';
import Cart from './Components/Cart/Cart';
import AdmingPage from './Components/Admin/AdminPage';
import CheckoutSuccess from './Components/CheckoutSuccess/CheckoutSuccess';
import IsAllowed from './Utils/isAllowed';

function App() {
  

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path='/promociones' element={<Promociones/>}/>
        <Route path='/recetas' element={<Recetas/>}/>
        <Route path="/checkout-success" element={<CheckoutSuccess/>}/>

        <Route element={<IsAllowed />}>
          <Route path='/profile' element={<UserPage/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path='/adminPage' element={<AdmingPage/>}/>
          <Route path='/createProduct' element={<CreateProduct/>}/>
        </Route>

        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </>
    
  );
}

export default App;
