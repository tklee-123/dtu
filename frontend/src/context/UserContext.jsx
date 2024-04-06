// Context
import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(() => {
    const storedState = localStorage.getItem("userInfo");
    return storedState ? JSON.parse(storedState) : {};
  });
  const [userName, setUserName] = useState(null);

  const login = (user) => {
    setUserInfo(user);
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  const setName = (user) => {
    setUserName(user);
  };
  const contextValue = {
    userInfo,
    userName,
    login,
    setName,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
