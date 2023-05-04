/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from "react";
import axios from "axios";

import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import Image from "./elements/Image";
import Logo from "../assets/logo.svg";
import FieldIco1 from "../general/img/field_ico_1.svg";
import FieldIco2 from "../general/img/field_ico_2.svg";
import FieldIco3 from "../general/img/field_ico_3.svg";
import FieldIco4 from "../general/img/field_ico_4.svg";

export default function Home() {
  const navigate = useNavigate();
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });



  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleValidation = () => {
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error(
        "Password and confirm password should be same.",
        toastOptions
      );
      return false;
    } else if (username.length < 3) {
      toast.error(
        "Username should be greater than 3 characters.",
        toastOptions
      );
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be equal or greater than 8 characters.",
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.status === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.status === true) {
        localStorage.setItem(
          process.env.REACT_APP_LOCALHOST_KEY,
          JSON.stringify(data.user)
        );
        navigate("/");
      }
    }
  };

  return (
    <>
      <div class="landing overflow-v">
            <header class="header">

                <p class="header__slogan">Find the perfect partner for you</p>

                <a class="button button_size-l button_color-white button_w20 mobile-only" href="login" >Login</a><br/>
                <a class="button button_size-l button_color-white button_w20 mobile-only" href="register" style={{marginBottom: '20px'}} >Join </a>
                <a class="button button_size-l button_color-accent button_w20 mobile-only" href="match" >Find Love </a>
                <div class="header__heart desktop-only">
                <img src={Logo} className="footer__logo" width={50}/>
                    {/* <img src="../general/img/logo_heart.svg" alt="heart"/> */}
                </div>
            </header>
            <div class="sticky">

            </div>
            <main class="main-content">
                <section class="section-intro">
                    <div class="new-container">
                        <div class="container__wrap">
                            <h2>Maybe you've tried before</h2>
                            <p>You've tried meeting someone on your own, or using a dating site. But none of those matches led to anything serious, and all the people you were even remotely interested in turned out to be totally wrong for you.</p>
                        </div>
                    </div>
                </section>
                <section class="section-profile">
                    <div class="new-container">
                        <div class="container__wrap">
                            <h2>
                                Finding the right person <span>is easier than you think</span>
                            </h2>
                            <p>It really is easy! MatchDay finds the most promising candidates for you based on your individual preferences, including your personality and looks, philosophy of life, interests, and the way you see the world</p>
                        </div>
                    </div>
                    <div class="section-profile__image"></div>
                </section>
                <section class="section-match new-container">
                    <div class="section-match__image"></div>
                    <div class="section-match__content">
                        <h2>
                            Send <mark>Likes</mark>
                            <br/>
                            &find <mark>Matches</mark>
                            !
                        </h2>
                        <p>
                            Intrigued by somebody's profile? Give that profile <strong>a Like</strong>
                            . If the interest is mutual, you're <strong>a Match</strong>
                            !
                        </p>
                        <p>Look closer at your new friend's profile. Learn about their interests, hobbies, or unusual haircut. Find something you want to talk about, and then go ahead and start a conversation.</p>
                    </div>
                </section>
                <section class="section-features new-container">
                    <div class="feature">
                        <img class="feature__icon" src={FieldIco1} alt="feature"/>
                        <h3 class="feature__title">Pick and choose your people</h3>
                        <p class="feature__desc">You deserve to spend your time talking with people you find interesting and pleasant. So go ahead and say YES to new friends, but say NO to people you'd rather avoid</p>
                    </div>
                    <div class="feature">
                        <img class="feature__icon" src={FieldIco2} alt="feature"/>
                        <h3 class="feature__title">We guarantee your data will stay confidential</h3>
                        <p class="feature__desc">Other people will only see the information you give them access to. MatchDay won't share your information with third parties</p>
                    </div>
                    <div class="feature">
                    <img class="feature__icon" src={FieldIco3} alt="feature"/>

                        <h3 class="feature__title">Your opinion matters</h3>
                        <p class="feature__desc">We're here 24/7 to help you solve problems</p>
                    </div>
                    <div class="feature">
                    <img class="feature__icon" src={FieldIco3} alt="feature"/>

                        <h3 class="feature__title">Report annoying profiles</h3>
                        <p class="feature__desc">You can always complain about unwanted behaviors or block a user</p>
                    </div>
                </section>
                <section class="section-stories new-container">
                    <div class="container__wrap">
                        <h2>
                            Love stories <span>of our own</span>
                        </h2>
                        <p>
                            If you're one of the hundreds of happy couples who met on MatchDay, share your story with us! That's our best reward!<br/>
                            <a href="/cdn-cgi/l/email-protection#2a595f5a5a45585e6a4f5c4f58474b5e494204474f" target="_blank">Tell us your story</a>
                        </p>
                        <h4>Take it from couples whose story began on MatchDay:</h4>
                    </div>
                    <div class="section-stories__list">
                        <div class="review">
                        <Image src={require("../general/img/couple_1.jpg")}
								alt="Logo"
								className="review__photo"
								width={100} />
                            <div class="review__content">
                                <div class="review__text">Neither one of us could believe it. I never thought I'd find someone to love so far from home!</div>
                                <div class="review__info">🇺🇸 Kevin and Tracy, 3.5 years together</div>
                            </div>
                        </div>
                        <div class="review">
                        <Image src={require("../general/img/couple_2.jpg")}
								alt="Logo"
								className="review__photo"
								width={100} />
                            <div class="review__content">
                                <div class="review__text">At first, I didn't realize what had happened. But after 5 weeks I knew we were together, and I was happy...</div>
                                <div class="review__info">🇺🇸 Aaron and Nicole, 8 months together</div>
                            </div>
                        </div>
                        <div class="review">
                            <Image src={require("../general/img/couple_3.jpg")}
								alt="Logo"
								className="review__photo"
								width={100} />
                            <div class="review__content">
                                <div class="review__text">I deleted my MatchDay profile. I found Nancy!</div>
                                <div class="review__info">🇺🇸 Anthony and Nancy, 1.5 years together</div>
                            </div>
                        </div>
                        <div class="review">
                        <Image src={require("../general/img/couple_4.jpg")}
								alt="Logo"
								className="review__photo"
								width={100} />
                            <div class="review__content">
                                <div class="review__text">To hell with other people's rules — we want to be together!</div>
                                <div class="review__info">🇺🇸 John and Alice, 2 years married</div>
                            </div>
                        </div>
                    </div>
                </section>
                <section class="section-promo new-container">
                    <div class="container__wrap">
                        <svg class="section-promo__ico" width="84" height="85" viewBox="0 0 84 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.6724 71.8323C20.1271 64.2923 2.83534 44.9899 2.03107 28.1003C1.02574 6.98824 24.6511 -5.0761 38.7258 6.48557C53.0184 18.2263 45.2605 33.1272 41.2391 31.1165C37.2178 29.1058 46.1684 5.05401 67.3778 10.5071C84.9712 15.0306 87.5474 40.6046 70.3938 57.7579C59.3351 68.8163 46.7685 76.8586 19.6245 83.3933" stroke="#FFBA33" stroke-width="3" stroke-linecap="round"/>
                        </svg>
                        <h2>Find the perfect partner for you</h2>

                        <a class="button button_size-l button_color-accent button_w100 mobile-only" href="match" target="_blank">Find Love </a>
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