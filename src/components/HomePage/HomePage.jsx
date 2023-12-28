import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css';
import Nav from '../Nav/Nav';


function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'SAGA_FETCH_BATTLE_INFO', payload: user.id });
  }, []);

  const goToNextPage = (params) => {

    history.push(`/${params}`)
  };

  return (
    <div className="container">
      
      <Nav />

      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>

      <button onClick={() => goToNextPage('characters')}>Characters</button>
      <button onClick={() => goToNextPage('shop')}>Shop</button>
      <button onClick={() => goToNextPage('battle')}>Campaign</button>
    </div>
  );
}

export default HomePage;
