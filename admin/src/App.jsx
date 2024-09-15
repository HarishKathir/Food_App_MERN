import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Orders from "./pages/Orders";
import Add from "./pages/Add";
import List from "./pages/List";
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = "http://localhost:8080"

  return (
      <BrowserRouter>
        <ToastContainer />
        <div className="bg-primary text-[#404040] text-[90%]">
          <Header />
          <div className="mx-auto max-w-[1440px] flex flex-col sm:flex-row mt-3">
            <Sidebar />
            <Routes>
              <Route path="/" element={<Add url={url}/>}/>
              <Route path="/list" element={<List url={url}/>}/>
              <Route path="/orders" element={<Orders url={url}/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  );
};

export default App;
