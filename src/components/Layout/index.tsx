import { Outlet, Link } from "react-router-dom";
import './style.scss'

const Layout = () => {
  return (
    <div className="block">
      <div className="menu">
        <Link to='games' >Игры вечера</Link>
        <Link to='random-chair'>Рассадка</Link>
        <Link to='stats'>Статистика</Link>
        <Link to='players'>Игроки</Link>
      </div>

      <Outlet />
    </div>

  )
}

export default Layout