import { Outlet } from "react-router-dom";
import './style.scss'
import Menu from '../Menu'

const Layout = () => {
  return (
    <div className="block">
        {/*MAIN*/}
      <Menu />
      <Outlet />
    </div>
  )
}

export default Layout
