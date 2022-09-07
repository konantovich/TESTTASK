import React from 'react';

import './App.css';

import AppHeader from './Header/appHeader';
import MainImage from './Main-image/main-image';
import UserCard from './User-card/user-card';
import Register from './Register/register';

export const UpdateUserCard = React.createContext(false);

function App() {
   const divUserRef = React.useRef();
   const divSignUpRef = React.useRef();


   const [updateUserCardAfterReg, setUpdateUserCardAfterReg] =
      React.useState(false);

   const handleScrollUsers = () => {
      divUserRef.current.scrollIntoView({ behavior: 'smooth' });
   };

   const handleScrollSignUp = () => {
      divSignUpRef.current.scrollIntoView({ behavior: 'smooth' });
   };

   return (
      <div className='App'>
         <UpdateUserCard.Provider
            value={{ updateUserCardAfterReg, setUpdateUserCardAfterReg }}
         >
            <AppHeader
               handleScrollUsers={handleScrollUsers}
               handleScrollSignUp={handleScrollSignUp}
            />
            <MainImage handleScrollSignUp={handleScrollSignUp} />
            <div ref={divUserRef}>
               <UserCard />
            </div>
            <div ref={divSignUpRef}>
               <Register handleScrollUsers={handleScrollUsers}/>
            </div>
         </UpdateUserCard.Provider>
      </div>
   );
}

export default App;
