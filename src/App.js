import React from 'react';

import './App.css';

import AppHeader from './Header/appHeader'
import MainImage from './Main-image/main-image'
import UserCard from './User-card/user-card'
import Register from './Register/register'

function App() {

  const divUserRef = React.useRef();
  const divSignUpRef = React.useRef();

  const handleScrollUsers = () => {

    divUserRef.current.scrollIntoView({ behavior: "smooth" });
  }

  const handleScrollSignUp = () => {

    divSignUpRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="App">
    <AppHeader handleScrollUsers={handleScrollUsers} handleScrollSignUp={handleScrollSignUp}/>
    <MainImage/>
    <div ref={divUserRef}>
      <UserCard />
    </div>
    <div ref={divSignUpRef}>
    <Register/>
    </div>
    </div>
  );
}

export default App;
