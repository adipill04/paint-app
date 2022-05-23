import React, { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("paint-app-access-token");
    return token !== null;
  });

  const login = (email, password) => {
    const reqBody = {
      email: email,
      password: password
    };
    axios.post('http://localhost:1337/api/login', reqBody)
        .then(response => {
            const data = response.data;
            if(data.user) {
                localStorage.setItem('paint-app-access-token', data.token);
                localStorage.setItem('userData', JSON.stringify(data.user));
                setLoggedIn(true);
            } else {
                console.log("Login failed");
            }
        }).catch((error) => {
            console.log("ERROR: "+error);
        });
  };

  const logout = () => {
    localStorage.clear();
    setLoggedIn(false);
  };

  const authContextValue = {
    login,
    loggedIn,
    logout
  };

  return ( 
    <AuthContext.Provider value={authContextValue} {...props} />
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
