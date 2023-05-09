/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";


import LogoLight from "../assets/flirtLogoDark.svg";
import { Modal } from "react-bootstrap";
import PaymentModal from "../pages/PaymentModal";
import axios from "axios";
import { logoutRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
    const [currentUser, setCurrentUser] = useState({});
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)));
        };
        fetchData();
    }, []);

    const creditColor = () => {
        if (currentUser.credits < 5) {
            return "text-danger";
        } else {
            return "text-success";
        }
    }

    const handleClick = async () => {
    
        const id = await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
        const data = await axios.get(`${logoutRoute}/${id}`);
        if (data.status === 200) {
          localStorage.clear();
          navigate("/login");
        }
      };

  return (
    
    <><div className='col-md-3 card-sidebar'>
          <div className='container'>
              <div className='card-body'>
                  <img class="img-responsive" style={{ width: '100%' }}
                      src={LogoLight} alt="" />

                  <br></br>
                  <div className='sidebar-options'>
                      <ul className='sidebar-links'>
                          <li><a href='/match'> <i style={{ color: 'red', marginRight: '20px' }} className='fa fa-heart'></i>Match Game</a></li>
                          <li><a href='/favorites'> <i style={{ color: 'red', marginRight: '20px' }} className='fa fa-heart-o'></i>Favorites</a></li>
                          <li><a href='/meet'> <i style={{ color: 'red', marginRight: '20px' }} className='fa fa-commenting-o'></i>Messages</a></li>
                          <li><a style={{cursor: 'pointer'}} onClick={()=> setShowModal(true)}> <i style={{ color: 'red', marginRight: '20px' }} className='fa fa-cubes'></i>Credit <span  className={creditColor()}>{currentUser.credits}</span></a></li>
                          <li><a href='/profile'> <i style={{ color: 'red', marginRight: '20px' }} className='fa fa-user-o'></i>My Profile</a></li>
                        <li><a style={{cursor: 'pointer'}} onClick={()=>handleClick()}> <i style={{ color: 'red', marginRight: '20px' }} className='fa fa-sign-out'></i>Logout</a></li>
                      </ul>
                  </div>
              </div>
              <span data-view="grid" data-link="members" data-members-link="grid" class="menu-link">

              </span>

          </div>
      </div>
      <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          backdrop="static"
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          size="md"
          style={{ width: "100%", borderRadius: "50px" }}
      >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                  <PaymentModal />
              </Modal.Body>
          </Modal></>
  );
}
