import { MENU } from '../../consts'
import { INavigation } from '../../interface'
import { NavLink } from "react-router-dom";
import './style.scss'


const Menu = () => {
  return (
    <div className="menu">
      {MENU.map((menu: INavigation) => {
        return <NavLink to={menu.to} className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "active" : ""
        }>{menu.title}</NavLink>
      })
      }
    </div>
  )

}

export default Menu