import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const AuthContext = createContext({});

const AuthProvider = (props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect( () => {
    // Pull saved login state from localStorage / AsyncStorage
    if(!loggedIn) {
      const token = localStorage.getItem('paint-app-access-token');
      if (token) verify(token);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    console.log("state of loading changed to: ",loading);
  }, [loading]);

  const verify = (token) => {
    axios.get('http://localhost:1337/api/verify', {
      headers: {
        "x-access-token": token
      }
    }).then(response => {
      console.log("response from verify: ", response);
      setLoggedIn(true);
    }).catch((error) => {
      console.log("ERROR: "+error);
  });
  }

  const login = (email, password) => {
    const reqBody = {
      email: email,
      password: password
    };
    axios.post('http://localhost:1337/api/login', reqBody)
        .then(response => {
            const data = response.data;
            if(data.user) {
                console.log("Login successful!");
                localStorage.setItem('paint-app-access-token', data.user)
                setLoggedIn(true);
            } else {
                console.log("Login failed");
            }
            console.log("login response: "+JSON.stringify(response));
        }).catch((error) => {
            console.log("ERROR: "+error);
        });
  };

  const logout = () => {
    sleep(2000).then(() => setLoggedIn(false));
  };

  const authContextValue = {
    login,
    loggedIn,
    logout
  };

  return ( loading? <div>LOADING...</div> : <AuthContext.Provider value={authContextValue} {...props} />);
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
