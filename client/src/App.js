import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import Container from '@mui/material/Container';
import { AuthContext } from "./Context/auth";
import Login from "./Pages/Public/Login";
import Register from "./Pages/Public/Register";
import Landing from "./Pages/Public/Landing";
import Dashboard from "./Pages/Private/Dashboard";
import Resume from "./Pages/Private/Resume";
import Billing from "./Pages/Private/Billing";
import Profile from "./Pages/Private/Profile";

const App = () => {
  const [authTokens, setAuthTokens] = useState();
  
  const setTokens = (data) => {
    localStorage.setItem("tokens", JSON.stringify(data));
    setAuthTokens(data);
  }

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Container maxWidth="xl" center>
      <Router>
          <ul>
          <li>
            <Link to="/">Home Page</Link>

            </li>
            <li>
            <Link to="/dashboard">Dashboard Page</Link>
            </li>
          </ul>
          
    
          <Route exact path="/" component={Landing} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <PrivateRoute path="/billing" component={Billing} />
          <PrivateRoute path="/resume" component={Resume} />
          <PrivateRoute path="/profile" component={Profile} />      
      </Router>
      </Container>
    </AuthContext.Provider>
  );
}

export default App;