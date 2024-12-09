import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Assuming the token is sufficient to consider the user as logged in
      // Ideally, you should verify the token with the server and get the user details
      setUser({ token }); // Set user to an object with the token, or more user details if available
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    // Additional login logic here
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    // Ensure to remove the token on logout
    // Additional logout logic here
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);