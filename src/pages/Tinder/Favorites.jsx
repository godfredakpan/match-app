import React, { useState, useEffect } from 'react';

// import css
import './TinderCards.css';
import { getAllFavorite } from '../../services/user';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import { useNavigate } from 'react-router-dom';

import SideBar from '../../components/SideBar';
import axios from 'axios';
import { allFavouriteRoute } from '../../utils/APIRoutes';


function Favorites() {
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                navigate("/login");
            }
            const currentUser = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
            const response = await axios.get(`${allFavouriteRoute}/${currentUser._id}`);
            console.log(response);
            setPeople(response.data)
        };
        fetchData();
    }, []);


    const chatWithUser = async (contact) => {
        localStorage.setItem('lovedContact', JSON.stringify(contact));
        navigate("/meet");

    }


    return (
        <>
            <div className='row'>
                <div className='col-md-8' style={{ marginTop: '50px' }}>
                    
                    <div class="container">
                        <a href='/match'><i className='fa fa-chevron-left ' style={{ float: 'left', color: 'red', marginRight: '20px' }}/></a>
                        <h1>Favorites</h1><br></br>
                        <div className='row'>
                            {people.map((contact, index) => (
                                <div onClick={() => chatWithUser(contact)} style={{cursor: 'pointer'}} className='col-md-3'>
                                        <img class="img-card" src={contact.avatarImage} alt="" />
                                        <p className='img-text'>{contact.name}</p>
                                        <h3 className='img-text'>{contact.age}</h3>
                                    <div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
                <SideBar />
            </div>
            </>
    );
}

export default Favorites;