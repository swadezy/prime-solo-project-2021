import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
          {loginLinkData.text}
        </Link>

        {user.id && (
          <>
            <Link className="navLink" to="/info">
              Info Page
            </Link>
            <Link className="navLink" to="/addLock">
              Add Lock
            </Link>
            <Link className="navLink" to="/viewLocks">
              View Locks
            </Link>
            <Link className="navLink" to="/addPicking">
              Add Picking
            </Link>
            <Link className="navLink" to="/viewHistory">
              View History
            </Link>
          </>
        )}
        {user.admin && (
          <Link className="navLink" to="/admin">
            Admin
          </Link>
        )}

        <Link className="navLink" to="/about">
          About
        </Link>
        {user.id && <LogOutButton className="navLink" />}
      </div>
    </div>
  );
}

export default Nav;
