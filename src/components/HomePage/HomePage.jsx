import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HomePage.css';
import Nav from '../Nav/Nav';
import StarterItem from '../StarterItem/StarterItem';

function HomePage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user.userReducer);
  const starter = useSelector(store => store.character.starter);


  useEffect(() => {
    dispatch({ type: 'SAGA_FETCH_BATTLE_INFO' });
  }, []);

  useEffect(() => {
    dispatch({ type: 'SAGA_FETCH_IVENTORY' });
  }, []);

  return (
    <div>

      <Nav />

      <div className="homePage">

        <div className="starterHomeView">

          {starter.map(start => {
            return (
              <div className="starter-single-box" key={start.id}>
                <StarterItem key={start.id} start={start} />
              </div>

            )
          })}
        </div>


        <button className="characterButton" onClick={() => history.push(`/characters`)}>Characters</button>
        <button className="shopButton" onClick={() => history.push(`/shop`)}>Shop</button>
        <button className="inventoryButton" onClick={() => history.push(`/inventory`)}>Inventory</button>

        <button className="campaignButton" onClick={() => history.push(`/campaign`)}>Campaign</button>

      </div>

    </div>
  );
}

export default HomePage;
