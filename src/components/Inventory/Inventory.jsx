import React, { useEffect } from 'react';
import BackButton from '../BackButton/BackButton';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../Nav/Nav';
import InventoryItem from '../InventoryItem/InventoryItem';
import './inventory.css';



function Inventory() {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector((store) => store.user.userReducer);
    const inventory = useSelector((store) => store.inventory.inventory);

    useEffect(() => {
        dispatch({ type: 'SAGA_FETCH_IVENTORY' });
    }, []);

    return (
        <div >

            <Nav />

            <div className="inventory">

                <h2>Inventory</h2>

                <div className="itemView">

                {inventory.length === 0 ? `go to the shop to get more items` : ""}
                {inventory.length === 0 ? <button onClick={() => history.push(`/shop`)}>Shop</button> : ""}

                    {inventory.map(inventoryItem => {
                        return (
                            <div key={inventoryItem.id}>
                                <InventoryItem inventoryItem={inventoryItem} />
                            </div>
                        )
                    })}

                </div>

                

            </div>

            <div className='backButton'>
                <BackButton />
            </div>

        </div>
    );
}

export default Inventory;