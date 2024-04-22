import React, { createContext, useState } from 'react';
import { decode } from 'jwt-decode';




export const AuthContext = createContext({
    user: null,
    handleLogin: (token) => {},
    handleLogout: () => {}
  });
  
  const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
  
    const handleLogin = (token) => {
      const decodedToken = decode(token); // Use the decode function to decode the token
      localStorage.setItem('userId', decodedToken.sub);
      localStorage.setItem('userRole', decodedToken.roles);
      localStorage.setItem('token', token);
      setUser(decodedToken);
    };
  
    const handleLogout = () => {
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      localStorage.removeItem('token');
      setUser(null);
    };
  
    return (
      <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
export default AuthProvider;