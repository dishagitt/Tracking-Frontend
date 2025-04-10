import { ToastContainer } from 'react-toastify';
import './App.css'
import React from "react";
import { BrowserRouter, BrowserRouter as Routes , Route } from "react-router-dom";
import CustomRoutes from './routes/routes';



function App() {
  return (
    <>
     <BrowserRouter>
        <CustomRoutes />
     </BrowserRouter>
     <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
