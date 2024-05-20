import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout'
import Setting from './pages/setting'
import NoPage from './pages/noPage';
import Games from './pages/games'
import RandomChair from './pages/randomChair'
import Stats from './pages/stats'
import Role from './pages/role'
import PrivateRoute from './components/PrivateRoute'
import Login from './pages/Login'
import './App.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* <Route index element={<Home />} /> */}
          <Route path="setting" element={<Setting />} />
          <Route path="games" element={<PrivateRoute Component={Games} />} />
          <Route path="stats" element={<Stats />} />
          <Route path="games/:id" element={<PrivateRoute Component={Role} />} />
          <Route path="random-chair" element={<PrivateRoute Component={RandomChair} />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>

  </React.StrictMode>
);
