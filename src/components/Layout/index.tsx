import { Outlet } from 'react-router-dom';

import Menu from '../Menu';
import './style.scss';

const Layout = () => {
  return (
    <div className="block">
      {/*MAIN*/}
      <Menu />
      <Outlet />
    </div>
  );
};

export default Layout;
