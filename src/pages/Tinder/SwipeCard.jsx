import React, { useRef, useState } from 'react';
import './SwipeCard.css';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Favorite from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios';
import { createFavoriteRoute, sendMessageRoute } from '../../utils/APIRoutes';
import { useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';


function SwipeCard({ data, onSwipe }) {

    const navigate = useNavigate();
    const socket = useRef();
    const [swipeDirection, setSwipeDirection] = useState(null);

    function handleSwipe(direction, contact) {
        setSwipeDirection(direction);
        onSwipe(data._id, direction);
        if (direction === 'right') {
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

          console.log(sendMessage);
    }

    const chatWithUser = async (contact) => {
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

        if (!data._id) {
            toast.error('Something went wrong, please try again')
        }

    }

    return (
        <div
            id={data.id}
            className={`swipe-card ${swipeDirection ? `swipe-${swipeDirection}` : ''}`}
            onTransitionEnd={handleTransitionEnd}
        >

                <div
                    className="card mx-auto"
                    style={{ backgroundImage: `url(${data.avatarImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    // sty
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
    );
}

export default SwipeCard;
