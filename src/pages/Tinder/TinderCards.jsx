import React, { useState, useEffect, useMemo, useRef } from 'react';

// import css
import './TinderCards.css';

// import tinder card
import TinderCard from 'react-tinder-card';

// import axios instance that we havwe created
import CloseIcon from '@material-ui/icons/Close';

import { getAllModerators } from '../../services/user';
import { IconButton } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import SendIcon from '@material-ui/icons/Send';
import ReplayIcon from '@material-ui/icons/Replay';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { createFavoriteRoute } from '../../utils/APIRoutes';
import { generateModerator } from '../elements/GeneratePeople';
import { toast } from 'react-toastify';


function TinderCards() {

    const [people, setPeople] = useState([]);

    const navigate = useNavigate();

    const [currentIndex, setCurrentIndex] = useState(people.length - 1)

    const canGoBack = currentIndex < people.length - 1

    const canSwipe = currentIndex >= 0

    const currentIndexRef = useRef(currentIndex)

    const childRefs = useMemo(
        () =>
          Array(people.length)
            .fill(0)
            .map((i) => React.createRef()),
        []
      )

      const updateCurrentIndex = (val) => {
        setCurrentIndex(val)
        currentIndexRef.current = val
      }

    useEffect(() => {
        async function fetchData(){
            const response = await getAllModerators();
            setPeople(response)
        };
        fetchData();
    }, []);

    const swiped = (direction, contact) => {
        // localStorage.setItem('lovedContact', JSON.stringify(contact));
        console.log("removing: " + JSON.stringify(contact));
    }

    const outOfFrame = (name) => {
        console.log(name + " left the screen!")
    }

    const chatWithUser = async(contact) => {


      const data  = await axios.post(createFavoriteRoute, {
        ...contact,
        id: contact._id,
        user_id: await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )._id,
      });

      console.log('contact', contact);

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

    const swipe = async (dir) => {
        if (canSwipe && currentIndex < people.length) {
          await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
        }
      }

      const goBack = async () => {
        if (!canGoBack) return
        const newIndex = currentIndex + 1
        updateCurrentIndex(newIndex)
        await childRefs[newIndex].current.restoreCard()
      }

    return (
        <div className="tinderCards" >
            <div className="tinderCards__cardContainer" style={{marginTop: '20px'}}>
            <button onClick={()=>  generateModerator()}></button>
                {people.map((person) => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        onSwipe={(dir) => swiped(dir, person)}
                        preventSwipe={["up", "down"]}
                        children={()=> console.log('person', person)}
                        onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        
                        <div
                            className="card"
                            style={{ backgroundImage: `url(${person.avatarImage})` }}
                        >
                            <h4 className='photo-name'>{person.name}<br/>
                            <span style={{fontSize:'12px'}}>{person.age}</span>
                            </h4>
                            {/* <IconButton className="love__btn">
                                <Favorite fontSize="medium" />
                            </IconButton> */}
                            <div className="swipeButtons">
                            {/* <IconButton onClick={() => goBack()} className="swipeButtons__left">
                                <ReplayIcon fontSize="medium" />
                            </IconButton> */}
                            <IconButton onClick={() => swipe('left')} className="swipeButtons__left">
                                <CloseIcon fontSize="medium" />
                            </IconButton>
                            <IconButton onClick={()=>chatWithUser(person)} className="swipeButtons__star">
                                <SendIcon fontSize="medium" />
                            </IconButton>
                            <IconButton onClick={()=>chatWithUser(person)} className="love__btn">
                                <Favorite fontSize="medium" />
                            </IconButton>
                        {/* <button onClick={()=>  generateModerator()}>Generate</button> */}
                        {/* <IconButton className="swipeButtons__lightning">
                            <FlashOnIcon fontSize="large" />
                        </IconButton> */}
                    </div>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default TinderCards;