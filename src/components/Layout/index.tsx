import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Link to='games'>ИГРЫ</Link>
      <Link to='random-chair'>Рассадка</Link>
      <Link to='stats'>Stats</Link>
      <Outlet />
    </>

  )
}

export default Layout