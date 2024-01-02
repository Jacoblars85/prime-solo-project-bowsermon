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
    dispatch({ type: 'SAGA_FETCH_BATTLE_INFO'});
  }, []);

  const goToNextPage = (params) => {

    history.push(`/${params}`)
  };

  return (
    <div>
      <Nav />

      <div className="homePage">


        <h2>Welcome, {user.username}!</h2>

        <div className="starterHomeView">

          <h3>Starter</h3>
          <p>goomba</p>

        </div>


        <button className="characterButton" onClick={() => goToNextPage('characters')}>Characters</button>
        <button className="shopButton" onClick={() => goToNextPage('shop')}>Shop</button>
        <button className="campaignButton" onClick={() => goToNextPage('battle')}>Campaign</button>

      </div>
    </div>
  );
}

export default HomePage;
