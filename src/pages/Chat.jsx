/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { allFavouriteRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import NavBar from "../components/NavBar";


export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(async () => {
    const lovedContact = localStorage.getItem('lovedContact');
    if (lovedContact) { 
      const lovedChat = JSON.parse(lovedContact)
      setCurrentChat(lovedChat)
    }
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allFavouriteRoute}/${currentUser._id}`);
        // const filteredData = data.data.filter((user) => {
        //   return user.chats.length > 0;
        // });
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    localStorage.setItem('lovedContact', JSON.stringify(chat));
  };

  // implement modal for selecting mesages amount

  return (
    <>
            <div className="dark dark-content" style={{backgroundColor: '#080420'}}>
                <div className="wrapper">
                    <>
                        <div className="sidebar">
                            <div className="sidebar-wrapper">
                                <ul className="nav">
                                <Contacts contacts={contacts} changeChat={handleChatChange} />
                                    {/* <Contacts moderators={moderators} conversation={conversation} contacts={contacts} changeChat={handleChatChange} /> */}
                                </ul>
                            </div>
                        </div>
                    </>
                    {/* sidebar end */}
                    <div className="main-panel">
                        <NavBar />
                        {/* <CheckoutForm amount={100} />  */}
                        <div className="content" style={{backgroundColor: '#080420'}}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card mx-auto" style={{ backgroundColor: '#080420', width: '200vh' }}>
                                        <div className="card-body" style={{ backgroundColor: '#080420' }}>
                                            {/* chat */}
                                            <div className="container" style={{ backgroundColor: '#080420' }}>
                                                {currentChat === undefined ? (
                                                    <Welcome />
                                                ) : (
                                                    <ChatContainer currentChat={currentChat} socket={socket} />
                                                )}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </>
  );
}
