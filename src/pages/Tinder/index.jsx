

// import Header compoent

import Header from './Header';
// import Tinder component
import TinderCards from './TinderCards';

// import Buttons component
import SwipeButtons from './SwipeButtons';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Tinder() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    }
  }, []);
  return (
    // BEM class naming convention
    <div className="app" style={{ marginBottom: '100px'}}>
      {/* Header */}
      {/* <Header /> */}
      {/* TinderCards */}
      <TinderCards />
      {/* SwipeButtons */}
      {/* <SwipeButtons /> */}
    </div>
  );
}

export default Tinder;