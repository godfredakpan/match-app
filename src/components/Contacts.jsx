/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

// import Logo from "../assets/logo.svg";

import "./Contacts.css";

export default function Contacts({ contacts, changeChat }) {
  const [, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);


  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <>
          {/* <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Match Day</h3>
          </div> */}
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <hr style={{ borderTop: '5px solid red'}}></hr>
                  <div className="avatar">
                    <img
                      src={`${contact.avatarImage}`}
                      alt=""
                      className=""
                      width={50}
                    />
                  </div>
                  <div>
                    <span className={`text-contact ${
                    index === currentSelected ? "text-selected" : ""
                  }`}>{contact.name}</span>
                  </div>
                </div>
              );
            })}
            
          </div>
          <div className="current-user">
            <div className="avatar">
              {/* <img
                src={`${currentUserImage}`}
                alt="avatar"
                className="avatar"
              /> */}
            </div>
            <div >
              {/* <h4 className="user">{currentUserName}</h4> */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
