import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';
import './index.css';
import Login from './pages/Login';
import Games from './pages/games';
import NoPage from './pages/noPage';
import Players from './pages/players';
import RandomChair from './pages/randomChair';
import Role from './pages/role';
import Setting from './pages/setting';
import Stats from './pages/stats';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
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
          <Route path="players" element={<PrivateRoute Component={Players} />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
