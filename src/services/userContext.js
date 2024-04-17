
import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUserData = localStorage.getItem('user');
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.clear();
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, logout, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);


