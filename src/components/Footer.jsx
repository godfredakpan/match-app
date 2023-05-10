/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Logo from "../assets/logo.svg";
export default function Footer() {
  
  return (
    <footer class="footer">
                <div class="new-container">
                <img src={Logo} className="footer__logo" width={400}/>
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
  );
}
