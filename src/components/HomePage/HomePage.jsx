import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css';
import Nav from '../Nav/Nav';
import StarterItem from '../StarterItem/StarterItem';


function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);
  const starter = useSelector(store => store.character.starter);


  useEffect(() => {
    dispatch({ type: 'SAGA_FETCH_BATTLE_INFO' });
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

            <h2>Starter</h2>

            {starter.map(start => {
              return (

                <StarterItem start={start} />

              )
            })}
          </div>


          <button className="characterButton" onClick={() => history.push(`/characters`)}>Characters</button>
          <button className="shopButton" onClick={() => history.push(`/shop`)}>Shop</button>
          <button className="campaignButton" onClick={() => history.push(`/campaign`)}>Campaign</button>

        </div>

    </div>
  );
}

export default HomePage;
