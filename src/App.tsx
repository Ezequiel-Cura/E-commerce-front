import React from 'react';
import './App.css';

//React-router-dom
import {Route, Routes} from "react-router-dom"

//COMPONENTS
import Home from './Components/Home/Home';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import NavBar from './Components/NavBar/NavBar';
import Products from './Components/Products.tsx/Products';
import CreateProduct from './Components/CreateProduct/CreateProduct';
import ProductDetail from './Components/ProductDetail/ProductDetail';



function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/createProduct' element={<CreateProduct/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </>
    
  );
}

export default App;
