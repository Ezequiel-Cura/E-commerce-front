import React from 'react';
import './App.css';

//React-router-dom
import {Route, Routes} from "react-router-dom"

//COMPONENTS
import Home from './Components/Home/Home';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import NavBar from './Components/NavBar/NavBar';



function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path=''/>
        <Route path='*' element={<ErrorPage/>}/>
      </Routes>
    </>
    
  );
}

export default App;
