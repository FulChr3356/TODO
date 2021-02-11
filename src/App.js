import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Login from "./components/login";
import SignUp from "./components/signup";
import Dashboard from "./components/dashboard";
function App() {
  return (

  <Router>
    <div className="App" >
      
      <header className="App-header">
      
    <Router >
      <Route exact path = "/" component = {Login}/>
      <Route  path = "/sign-in" component = {Login}/>
      <Route path = "/registration" component = {SignUp}/>
      <Route path = "/dashboard" component={Dashboard}/>

    </Router>
    
    </header>
    </div> </Router>


  );
}

export default App;