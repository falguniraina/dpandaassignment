import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrentUserContext = createContext();

const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    () => {
      if (localStorage.getItem('CurrentUser')) {
        let decryptUser = JSON.parse(window.atob(localStorage.getItem("CurrentUser")));
        return decryptUser;
      } else {
        return undefined;
      }

    }
  );

  useEffect(() => {
    if (currentUser !== undefined) {

      let encryptDetails = window.btoa(JSON.stringify(currentUser));
      localStorage.setItem('CurrentUser', encryptDetails);
    }
    else {
      localStorage.removeItem('CurrentUser');
    }

  }, [currentUser]);

  const addCurrentUser = (user) => {
    setCurrentUser(user);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, addCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

export { CurrentUserProvider, useCurrentUser };