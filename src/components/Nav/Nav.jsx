import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Settings from '../Settings/Settings';

function Nav() {
  const user = useSelector((store) => store.user.userReducer);
  console.log("user is:", user)

  return (
    <div className="nav">

      <Link to="/home">
        <h2 className="nav-title">Kingdom Clash</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <span className='navLink'><img height={20} width={20} src='/images/Coin_-_New_Super_Mario_Bros.webp'/> {user.coins}</span>

            <div className='navLink'>
              <Settings />
              </div>

          </>
        )}

        {/* <Link className="navLink" to="/about">
          About
        </Link> */}
      </div>
    </div>
  );
}

export default Nav;
