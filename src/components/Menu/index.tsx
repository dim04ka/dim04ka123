import { NavLink, useNavigate } from 'react-router-dom';

import { CLUB, IS_AUTHENTICATED, MENU } from '../../consts';
import { INavigation } from '../../interface';
import './style.scss';

const Menu = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem(CLUB);
    localStorage.removeItem(IS_AUTHENTICATED);
    navigate('random-chair');
    window.location.reload();
  };
  return (
    <div className="menu">
      {MENU.map((menu: INavigation) => {
        return (
          <NavLink
            key={menu.title}
            to={menu.to}
            className={({ isActive, isPending }) =>
              isPending ? 'pending' : isActive ? 'active' : ''
            }
          >
            {menu.title}
          </NavLink>
        );
      })}
      <button onClick={() => handleClick()}>Выйти</button>
    </div>
  );
};

export default Menu;
