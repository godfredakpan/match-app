/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Logout from "./Logout";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { sendMessageRoute, recieveMessageRoute } from "../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import PaymentModal from "../pages/PaymentModal";
import { minusCredit } from "../services/user";

export default function ChatContainer({ currentChat, socket }) {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const navigate = useNavigate();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    const response = await axios.post(recieveMessageRoute, {
      from: data._id,
      to: currentChat.id,
    });
    setMessages(response.data);
  }, [currentChat]);

  useEffect(() => {
    const getCurrentChat = async () => {
      if (currentChat) {
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )._id;
      }
    };
    getCurrentChat();
  }, [currentChat]);

  const handleSendMsg = async (msg) => {

    if (currentUser.credits === 0) {
      setShowModal(true);
      return;
    }
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: data._id,
      msg,
    });

    await axios.post(sendMessageRoute, {
      from: data._id,
      to: currentChat.id,
      message: msg,
      sent_by_client: 'true', // continue from here 
    });

    const body = { credits: currentUser.credits - 1, user_id: currentUser._id };

    await minusCredit(body);

    const user = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );

    user.credits = body.credits;

    localStorage.setItem(
      process.env.REACT_APP_LOCALHOST_KEY,
      JSON.stringify(user)
    );

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <><Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">
            <img
              src={`${currentChat.avatarImage}`}
              alt="" />
          </div>
          <div>
            <h3 className="username-top">{currentChat.name}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <div className="chat-messages">
        {messages.map((message) => {
          return (
            <div ref={scrollRef} key={uuidv4()}>
              <div
                className={`message ${message.fromSelf ? "sended" : "recieved"}`}
              >
                <div className="content ">
                  <p className="message ">{message.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
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
      </Modal>
      </>
  );
}

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  column-gap: 0.1rem;
  height: 85vh;
  overflow: hidden;
  .username-top{
    color: #fff;
  }
  .message{
    color: #fff;
  }
  @media(max-width: 480px) {
    height: 70vh;
    grid-template-rows: 20% 60% 10%;
}
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color:#AC1B56;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #00008b;
        color: #fff !important;
      }
    }
    @media screen and (max-width: 960px) {
      .container {
        height: 94vh;
        width: 105vw;
        background-color: #00000076;
        display: grid;
        grid-template-columns: 25% 75%;
    }
      gap: 0.5rem;
      column-gap: 0.5rem;
      grid-template-rows: 100% 55% 200%;
    
    }
  }
`;
