import React from 'react';

// import css
import './Header.css';

// import person icon from material ui
import PersonIcon from '@material-ui/icons/Person';
// import message icon
import ForumIcon from '@material-ui/icons/Forum';
// import icon button to make icon button
import IconButton from '@material-ui/core/IconButton';
import Logo from "../../assets/logo.svg";
function Header() {
    return (
        <div className="chat-header">
            <a href='meet'>
            <IconButton style={{color: '#DC005A'}}>
                <PersonIcon 
                    fontSize="large" className="header__icon" />
            </IconButton>
            </a>
            <a href='/'>
            <img
                className="header__logo" 
                src={Logo} 
                style={{marginTop: '20px'}}
                alt="Tinder" />
            </a>
            <a href='meet'>
            <IconButton style={{color: '#DC005A'}}>
                <ForumIcon 
                    fontSize="large"  className="header__icon" />
            </IconButton>
            </a>
        </div>
    );
}

export default Header;