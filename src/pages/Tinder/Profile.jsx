import React, { useState, useEffect } from 'react';

// import css
import './TinderCards.css';
import { useNavigate } from 'react-router-dom';

import SideBar from '../../components/SideBar';
import axios from 'axios';
import { allFavouriteRoute } from '../../utils/APIRoutes';


function Profile() {
    const navigate = useNavigate();
    const [people, setPeople] = useState([]);
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [city, setCity] = useState('');
    const [height, setHeight] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [eyeColor, setEyeColor] = useState('');
    const [about, setAbout] = useState('');

    useEffect(() => {
        async function fetchData() {
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                navigate("/login");
            }
            const currentUser = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
            const response = await axios.get(`${allFavouriteRoute}/${currentUser._id}`);

            setGender(response.data.gender);
            setDateOfBirth(response.data.dateOfBirth);
            setCity(response.data.city);
            setHeight(response.data.height);
            setBodyType(response.data.bodyType);
            setMaritalStatus(response.data.maritalStatus);
            setHairColor(response.data.hairColor);
            setEyeColor(response.data.eyeColor);
            console.log(response);
            setPeople(response.data)
        };
        fetchData();
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: Submit form data to server or store in state
      }


    return (
        <>
            <div className='row'>
                <div className='col-md-8' style={{ marginTop: '50px' }}>
                    
                    <div class="container">
                        <a href='/match'><i className='fa fa-chevron-left ' style={{ float: 'left', color: 'red', marginRight: '20px' }}/></a>
                        <h1>Profile</h1><br></br>

                            <form onSubmit={handleSubmit}>
                            <div className='row'>
                            <div class="form-group col-md-6">
                                    Gender:
                                    <input type="text" className="form-control" value={gender} onChange={(event) => setGender(event.target.value)} />
                                </div>
                                <br />
                                <div class="form-group col-md-6">
                                    Date of birth:
                                    <input type="text" className="form-control col-md-12" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />

                                </div>
                                <br />
                                <div class="form-group col-md-6">

                                    City:
                                    <input type="text" className="form-control col-md-12" value={city} onChange={(event) => setCity(event.target.value)} />
                                </div>
                                <br />
                                <div class="form-group col-md-6">

                                    Height:
                                    <input type="text" className="form-control col-md-12" value={height} onChange={(event) => setHeight(event.target.value)} />

                                </div>
                                <br />
                                <div class="form-group col-md-6">

                                    Body type:
                                    <input type="text" className="form-control col-md-12" value={bodyType} onChange={(event) => setBodyType(event.target.value)} />

                                </div>
                                <br />
                                <div class="form-group col-md-6">
                                
                                    Marital status:
                                    <input type="text" className="form-control col-md-12" value={maritalStatus} onChange={(event) => setMaritalStatus(event.target.value)} />
                                
                                </div>
                                <br />
                                <div class="form-group col-md-6">
                                
                                    Hair color:
                                    <input type="text" className="form-control col-md-12" value={hairColor} onChange={(event) => setHairColor(event.target.value)} />
                                
                                </div>
                                <br />
                                <div class="form-group col-md-6">
                                
                                    Eye color:
                                    <input type="text" className="form-control col-md-12" value={eyeColor} onChange={(event) => setEyeColor(event.target.value)} />
                                
                                </div>
                                <div class="form-group col-md-12">
                                
                                    About:
                                    <textarea className="form-control col-md-12" value={eyeColor} onChange={(event) => setAbout(event.target.value)} />
                                
                                </div>
                                <br />
                                <div class="form-group col-md-6">
                                <button className='btn btn-primary col-md-12' type="submit">Submit</button>
                                </div>
                                </div>
                                </form>  
                        
                    </div>
                </div>
                <SideBar />
            </div>
            </>
    );
}

export default Profile;