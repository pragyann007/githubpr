import React, { createContext } from "react";
import useUser from "../hooks/useUser";

export const userContext = createContext();

const UserContext = ({ children }) => {
  const value = useUser();

  return (
    <userContext.Provider value={value}>
      {children}
    </userContext.Provider>
  );
};

export default UserContext;