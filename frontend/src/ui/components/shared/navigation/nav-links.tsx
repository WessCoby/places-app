import React, { FC, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../../../context';


const NavLinks: FC = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/users" exact>ALL USERS</NavLink>
      </li>
      {isAuthenticated() && (
        <>
          <li>
            <NavLink to={`/${user!.id}/places`} exact>MY PLACES</NavLink>
          </li>
          <li>
            <NavLink to="/places/new" exact>ADD PLACE</NavLink>
          </li>
        </>
      )}
      {!isAuthenticated() && (
        <li>
          <NavLink to="/auth">LOGIN</NavLink>
        </li>
      )}
      {isAuthenticated() && (
        <li>
          <button onClick={logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;