/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  useState } from 'react';
import './SwipeCard.css';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Favorite from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import { createFavoriteRoute, sendMessageRoute } from '../../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import PaymentModal from '../PaymentModal';


function SwipeCard({ data, onSwipe }) {

    const navigate = useNavigate();
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    function handleSwipe(direction, contact) {
        setSwipeDirection(direction);
        onSwipe(data._id, direction);
        if (direction === 'right') {
            setShowModal(true);
            createFav(contact);
            toast.success(`You matched with ${contact.name}`);
            localStorage.setItem('lovedContact', JSON.stringify(contact));
        }
        if (direction === 'left') {
            toast.info(`Skipped ${contact.name}`);
        }
    }

    function handleTransitionEnd() {
        if (swipeDirection) {
            // Remove the swiped card from the DOM
            document.getElementById(data._id).remove();
        }
    }


    const createFav = async (contact) => {
        await axios.post(createFavoriteRoute, {
            ...contact,
            id: contact._id,
            user_id: await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )._id,
        });

        const data = await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          );
        
          const gender = (contact) => {
          if(contact.gender === 'Female'){
            return "her"
          }else{
            return "his"
          }
        }

        const msg = `Hey ${data.name}, We just wanted to let you know that flirtdatingmatch.com user ${contact.name} added you to ${gender(contact.gender)} favorites. Since you have already added ${contact.name} to your favorite, you can now send a message to say hi, thank you or something entirely else.`;
        
        //   socket.current.emit("send-msg", {
        //     to: data._id,
        //     from: contact._id,
        //     msg,
        //   });
      
          const sendMessage = await axios.post(sendMessageRoute, {
            from: contact._id,
            to: data._id,
            message: msg,
          });

          setTimeout(() => {
            setShowModal(true);
            setShowModal(true);
        }, 1000);

          console.log(sendMessage);
    }


    const sendMessage = async (contact) => {
        if (!message) return;

        if(await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        ).credits === 0){
            setShowPaymentModal(true);
            return;
        }

        const data = await axios.post(sendMessageRoute, {
            from: await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )._id,
            to: contact._id,
            message: message,
        });

        if (data.status === 200) {
            toast.success('Message sent successfully');
            setShowModal(false);
            setMessage('');
        }
    }

    const chatWithUser = async (contact) => {
        setShowModal(true);
        const data = await axios.post(createFavoriteRoute, {
            ...contact,
            id: contact._id,
            user_id: await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            )._id,
        });

        if (data.id) {
            localStorage.setItem('lovedContact', JSON.stringify(contact));
            navigate("/meet");
        }

        if (data.status === 202) {
            localStorage.setItem('lovedContact', JSON.stringify(contact));
            navigate("/meet");
        }

        // if (!data._id) {
        //     toast.error('Something went wrong, please try again')
        // }

    }

    return (
        <><div
            id={data.id}
            className={`swipe-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
            onTransitionEnd={handleTransitionEnd}
        >

            <div
                className="card mx-auto"
                style={{ backgroundImage: `url(${data.avatarImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
                {/* img */}
                {/* <img src={data.avatarImage} width={500} alt="" /> */}
                <h4 className='photo-name'>{data.name}<br />
                    <span style={{ fontSize: '12px' }}>{data.age}</span>
                </h4>
            </div>
            <div className="card-actions">
                <div className="swipeButtons">
                    <IconButton onClick={() => handleSwipe('left', data)} className="swipeButtons__left">
                        <CloseIcon fontSize="medium" />
                    </IconButton>
                    <IconButton onClick={() => chatWithUser(data)} className="swipeButtons__star">
                        <SendIcon fontSize="medium" />
                    </IconButton>
                    <IconButton onClick={() => handleSwipe('right', data)} className="love__btn">
                        <Favorite fontSize="medium" />
                    </IconButton>
                </div>
            </div>
        </div>
        <Modal
            show={showPaymentModal}
            onHide={() => setShowPaymentModal(false)}
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
            </Modal>
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
        <div className="col-md-12">
                <div className="">
                    <div className="modal-container" style={{ marginTop: '20px' }}>
                        <h2 className="out">Add a message</h2>
                        <p className="accent">Send a message to your match.</p>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="">
                                    <div className="card-body">
                                       <input type="text" className="form-control" placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        <button className="btn btn-danger" onClick={() => setShowModal(false)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => sendMessage(data)}>Send</button>
                    </div>
                </div>
            </div>
            </Modal.Body>
            </Modal>
            </>
    );
}

export default SwipeCard;
