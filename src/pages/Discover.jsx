/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from "react";

import { getAllModerators } from "../services/user";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "./elements/Image";
import Logo from "../assets/logo.svg";
import Loader from "../assets/loader.gif";
import { useNavigate } from "react-router-dom";
export default function Discover() {

  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [LeavePerPage] = useState(10);
  const navigate = useNavigate();
    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await getAllModerators();
            setDates(response);
            setLoading(false);
        }
        fetchData();
    }, []);

    const indexOfLastLeave = currentPage * LeavePerPage;
    const indexOfFirstLeave = indexOfLastLeave - LeavePerPage;
    const currentLeaves = dates.slice(indexOfFirstLeave, indexOfLastLeave);

    const paginate = pageNumber => setCurrentPage(pageNumber);
    const nextPage = () => setCurrentPage(currentPage + 1);
    const prevPage = () => setCurrentPage(currentPage - 1);

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(dates.length / LeavePerPage); i++) {
        pageNumbers.push(i);
    }

    const chatWithUser = (contact) => {
        localStorage.setItem('lovedContact', JSON.stringify(contact));
        navigate("/meet");
    }


  return (
    <>
      <div class="landing overflow-v">
            <header class="header">

                <p class="header__slogan">Find the perfect partner for you</p>

                <a class="button button_size-l button_color-white button_w20 mobile-only" href="login" >Login</a><br/>
                <a class="button button_size-l button_color-accent button_w20 mobile-only" href="register" >Find Love </a>
                <div class="header__heart desktop-only">
                <img src={Logo} className="footer__logo" width={50}/>
                    {/* <img src="../general/img/logo_heart.svg" alt="heart"/> */}
                </div>
            </header>
            <div class="sticky">

            </div>
            <main class="main-content">
                <section class="section-stories new-container">
                    <div class="container__wrap">
                        <h2>
                            Write your own <span>love story</span>
                        </h2>
                        <p>
                            Meet your soulmate here<br/>
                        </p>
                    </div>
                    <div class="section-stories__list">
                    {currentLeaves.map((user, index) => (
                        <div class="review" key={index}>
                        <img src={user.avatarImage}
								alt="Logo"
								className="review__photo"
								style={{width: '200px', height: '200px'}} />
                            <div class="review__content">
                                <div class="review__text">{user.name}</div>
                                <div class="review__text">Age: {user.age} </div>
                                <div class="review__text">Height: {user.height}</div>
                                <div class="review__info">{user.about}</div><br/>
                                <div class="review__info"><i onClick={()=> chatWithUser(user)} class="fa click_icon red fa-2x fa-heart"></i> <i onClick={()=> chatWithUser(user)} class="fa fa-2x click_icon green fa-telegram" aria-hidden="true"> </i>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    <div className='section-stories__list'>
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-end">
                                <li className="page-item" style={{ marginRight: '5px' }}>
                                    <button className="btn btn-sm btn-primary" onClick={prevPage} disabled={currentPage === 1 ? true : false}><i className="fa fa-angle-double-left"></i></button>
                                </li>
                                {pageNumbers.map(number => (
                                    <li key={number} className="page-item" style={{ marginRight: '5px' }}>
                                        <button onClick={() => paginate(number)} className={currentPage === number ? 'btn btn-sm btn-primary' : 'btn btn-sm btn-outline-primary'}>{number}</button>
                                    </li>
                                ))}
                                <li className="page-item">
                                    <button className="btn btn-sm btn-primary" onClick={nextPage} disabled={currentPage === pageNumbers.length ? true : false}><i className="fa fa-angle-double-right"></i></button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </section>
                <section class="section-promo new-container">
                    <div class="container__wrap">
                        <svg class="section-promo__ico" width="84" height="85" viewBox="0 0 84 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.6724 71.8323C20.1271 64.2923 2.83534 44.9899 2.03107 28.1003C1.02574 6.98824 24.6511 -5.0761 38.7258 6.48557C53.0184 18.2263 45.2605 33.1272 41.2391 31.1165C37.2178 29.1058 46.1684 5.05401 67.3778 10.5071C84.9712 15.0306 87.5474 40.6046 70.3938 57.7579C59.3351 68.8163 46.7685 76.8586 19.6245 83.3933" stroke="#FFBA33" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                        <h2>Find the perfect partner for you</h2>

                        <a class="button button_size-l button_color-accent button_w100 mobile-only" href="#" target="_blank">Find Love </a>
                    </div>
                </section>
            </main>
            <footer class="footer">
                <div class="new-container">
                <img src={Logo} className="footer__logo" width={50}/>
                    <ul class="footer__links">
                        <li>
                            <a href="#" target="_blank">Privacy policy</a>
                        </li>
                        <li>
                            <a href="#" target="_blank">Terms of use</a>
                        </li>
                        <li>
                            <a href="#" target="_blank">© {new Date().getFullYear()} MatchDay</a>
                        </li>
                    </ul>
                </div>
            </footer>
        </div>
      <ToastContainer />
    </>
  );
}