import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import Settings from '../Settings/Settings';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CircularProgressWithLabel(props) {
  const user = useSelector((store) => store.user.userReducer);
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex', }}>
      <CircularProgress size={50}
        thickness={6} variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="white" fontSize="20px">
          {Math.floor(user.xp_level)}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};



function Nav(props) {
  const user = useSelector((store) => store.user.userReducer);

  const normalise = () => ((user.xp_level - Math.floor(user.xp_level ) - 0) * 100) / (1 - 0);

  return (
    <div className="nav">

      <Link to="/home">
        <h2 className="nav-title">Bowsermon</h2>
      </Link>
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
           <Box
           sx={{
             display: 'flex',
             alignItems: 'center',
             justifyContent: 'center',
           }}
         >
            <div style={{ padding: "10px 10px 10px 10px", color: "white", fontSize: "20px",}}><img height={20} width={20} src='/images/Coin_-_New_Super_Mario_Bros.webp'/> {user.coins}</div>

            <div style={{ padding: "5px 5px 10px 12px"}}>
            <CircularProgressWithLabel value={normalise(props.value)} />
            </div>

            <div >
              <Settings />
              </div>
           
          </Box>
          
        )}
        
    </div>
  );
}

export default Nav;
