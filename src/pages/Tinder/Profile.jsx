import React, { useState, useEffect, useCallback } from 'react';

// import css
import './TinderCards.css';
import { useNavigate } from 'react-router-dom';

import SideBar from '../../components/SideBar';
import { updateUserRoute } from '../../utils/APIRoutes';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import UploadCloudinary from '../../services/cloudinary/UploadCloudinary';


function Profile() {
    const navigate = useNavigate();
    const [gender, setGender] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [city, setCity] = useState('');
    const [height, setHeight] = useState('');
    const [bodyType, setBodyType] = useState('');
    const [maritalStatus, setMaritalStatus] = useState('');
    const [hairColor, setHairColor] = useState('');
    const [eyeColor, setEyeColor] = useState('');
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState(null);
    const [uploadLoading, setUploadLoading] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState(undefined);
    const [userId, setUserId] = useState(undefined);

    useEffect(() => {
        async function fetchData() {
            if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
                navigate("/login");
            }
            const currentUser = await JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));
            setGender(currentUser.gender);
            setName(currentUser.name);
            setEmail(currentUser.email);
            setDateOfBirth(currentUser.dateOfBirth);
            setCity(currentUser.city);
            setHeight(currentUser.height);
            setBodyType(currentUser.bodyType);
            setMaritalStatus(currentUser.maritalStatus);
            setHairColor(currentUser.hairColor);
            setEyeColor(currentUser.eyeColor);
            setUsername(currentUser.username);
            setAge(currentUser.age);
            setAbout(currentUser.about);
            setImage(currentUser.avatarImage);
            setUserId(currentUser._id);
        };
        fetchData();
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
    // const { name, email, age, about, username, password, dob, gender, relationship_status, body_type, hair_color, eye_color, city, avatarImage  } = req.body;
    const body = {
        name,
        email,
        age,
        about,
        username,
        dob: dateOfBirth,
        gender,
        relationship_status: maritalStatus,
        body_type: bodyType,
        hair_color: hairColor,
        eye_color: eyeColor,
        city,
        avatarImage: image,
        user_id: userId,
        height,
    }

    await axios.post(updateUserRoute, body)
        .then((response) => {
            console.log(response.data);
            if (response.data.status === true) {
                localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY, JSON.stringify(response.data.user));
                toast.success("Profile updated successfully");
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleFile = async e => {
        setUploadLoading(true);
        const file = e.target.files[0];
    
        if (!file.type.match('image.*')) {
          toast.error("Please upload an image file");
          setUploadLoading(false);
          return;
        }
        if (file.size > 5000000) {
          toast.error("Image size should not exceed 5MB");
          setUploadLoading(false);
          return;
        }
        const upload = await UploadCloudinary(file);
        setImage(upload.secure_url);
        setSelectedAvatar(upload.secure_url)
        toast.success("Image uploaded successfully!");
        setUploadLoading(false);
      }
    
      const chooseFile = useCallback(() => {
        const dropArea = document.querySelector(".drop_box");
        const button = dropArea.querySelector("button");
        const input = dropArea.querySelector("input");
        button.onclick();
        input.click();
      }, [])
    
    return (
        <>
            <ToastContainer/>
            <div className='row'>
                <div className='col-md-8' style={{ marginTop: '50px' }}>

                    <div class="container">
                        <a href='/match'><i className='fa fa-chevron-left ' style={{ float: 'left', color: 'red', marginRight: '20px' }} /></a>
                        <h1>Profile</h1><br></br>

                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div class="form-group col-md-6">
                                    Name:
                                    <input readOnly type="text" className="form-control" value={name} />
                                </div><br></br>
                                <div class="form-group col-md-6">
                                    Email:
                                    <input readOnly type="text" className="form-control" value={email} />
                                </div>
                                <br />
                                <div class="form-group col-md-6">
                                    Username:
                                    <input readOnly type="text" className="form-control" value={username} />
                                </div>
                                <br />
                                <div class="form-group col-md-6">
                                    Age:
                                    <input readOnly type="text" className="form-control" value={age} />
                                </div>
                                <br />
                                <div class="form-group col-md-6">
                                    Gender:
                                    <select value={gender} onChange={(event) => setGender(event.target.value)} class="style-two" data-field="gender" required="">
                                        <option value="">{gender ? gender : '-- Please select -- '} </option>
                                        <option value="male">Man</option>
                                        <option value="female">Woman</option></select>
                                    {/* <input  type="text" className="form-control" value={gender} onChange={(event) => setGender(event.target.value)} /> */}
                                </div>
                                <br />
                                <div class="form-group col-md-6">
                                    Date of birth:
                                    <input type="date" className="form-control col-md-12" value={dateOfBirth} onChange={(event) => setDateOfBirth(event.target.value)} />

                                </div>
                                <br />
                                <div class="form-group col-md-6">

                                    City:
                                    <input type="text" className="form-control col-md-12" value={city} onChange={(event) => setCity(event.target.value)} />
                                </div>
                                <br />
                                <div class="form-group col-md-6">

                                    Height:
                                    <select onChange={(event) => setHeight(event.target.value)} className="form-control col-md-12" name="height" id="length" data-field="lengthChoice" data-required="false">

                                        <option value="">{height && height !== '' ? height : '-- Please select -- '}</option>
                                        <option value="000-139">Shorter than 4' 7"</option>
                                        <option value="140-149">From 4' 7" to 4' 11"</option>
                                        <option value="150-159">From 4' 11" to 5' 3"</option>
                                        <option value="160-169">From 5' 3" to 5' 7"</option>
                                        <option value="170-179">From 5' 7" to 5' 11"</option>
                                        <option value="180-189">From 5' 11" to 6' 3"</option>
                                        <option value="190-200">From 6' 3" to 6' 7"</option>
                                        <option value="201-999">Taller than 6' 7"</option>
                                    </select>
                                    {/* <input type="text" className="form-control col-md-12" value={height} onChange={(event) => setHeight(event.target.value)} /> */}

                                </div>
                                <br />
                                <div class="form-group col-md-6">

                                    Body type:
                                    <select onChange={(event) => setBodyType(event.target.value)} name="bodyType" id="body_type" className="form-control col-md-12" data-field="build" data-required="false"><option value=""> -- Please select -- </option><option value="athletic">Athletic</option><option value="normal">Average</option><option value="slim">Slender</option><option value="curvaceous">Curvy</option><option value="heavy">Heavy</option></select>
                                    {/* <input type="text" className="form-control col-md-12" value={bodyType} onChange={(event) => setBodyType(event.target.value)} /> */}

                                </div>
                                <br />
                                <div class="form-group col-md-6">

                                    Relationship status:
                                    <select  className="form-control col-md-12" value={maritalStatus} onChange={(event) => setMaritalStatus(event.target.value)} id="marital_status" name="marital_status" data-field="civilStatus" data-required="false"><option value=""> -- Please select -- </option><option value="divorced">Divorced</option><option value="married">Married</option><option value="relation">Relationship</option><option value="living_apart_together">Living apart together</option><option value="living_together">Living together</option><option value="single">Single</option><option value="widow">Widowed</option></select>
                                    {/* <input type="text" className="form-control col-md-12" value={maritalStatus} onChange={(event) => setMaritalStatus(event.target.value)} /> */}

                                </div>
                                <br />
                                <div class="form-group col-md-6">

                                    Hair color:
                                    <select className="form-control col-md-12" onChange={(event) => setHairColor(event.target.value)} id="hair_color" name="hair_color" data-field="hairColor" data-required="false"><option value=""> -- Please select -- </option><option value="blond">Blond</option><option value="darkblond">Dark blond</option><option value="brown">Brown</option><option value="black">Black</option><option value="bald">Bald</option><option value="red">Red</option><option value="grey">Grey</option><option value="colored">Other</option></select>
                                    {/* <input type="text" className="form-control col-md-12" value={hairColor} onChange={(event) => setHairColor(event.target.value)} /> */}

                                </div>
                                <br />
                                <div class="form-group col-md-6">

                                    Eye color:
                                    <select value={eyeColor} onChange={(event) => setEyeColor(event.target.value)} className="form-control col-md-12" id="eye_color" name="eye_color" data-field="eyeColor" data-required="false"><option value=""> -- Please select -- </option><option value="blue">Blue</option><option value="brown">Brown</option><option value="grey">Grey</option><option value="green">Green</option></select>
                                    {/* <input type="text" className="form-control col-md-12" value={eyeColor} onChange={(event) => setEyeColor(event.target.value)} /> */}

                                </div><br/>
                                <div class="form-group col-md-12">
                                <span style={{color: 'white'}}>Photo: <span className='mx-auto text-warning'>Image should not exceed 5MB</span></span><br/>
                                {uploadLoading && <p className="text-success">Loading...</p>}
                                {image ? <img width="10%" className="img-profile" src={image} alt="" /> : <img className="img-profile" src={selectedAvatar} width="10%" alt="" />
                                }
                                <div className="drop_box">
                                    {/* <label className="btn btn-sm btn-primary">Photo</label> */}
                                    <input name="file" type="file" onChange={handleFile} hidden accept='png, jpg' id="fileID" style={{ display: 'none' }} />
                                    <button onClick={chooseFile} disabled={uploadLoading && true} className="btn-sm btn-upload"><i className="fa fa-cloud-upload fa-3x" aria-hidden="true"></i></button>
                                </div>
                                </div>
                                <div class="form-group col-md-12">

                                    About:
                                    <textarea className="form-control col-md-12" value={about} onChange={(event) => setAbout(event.target.value)} />

                                </div>
                                <br />
                                

                                <div class="form-group col-md-6">
                                    <button className='btn btn-primary col-md-12' type="submit">Save</button>
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