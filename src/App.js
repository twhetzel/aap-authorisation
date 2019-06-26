import React from 'react';
import './App.css';
import Login from './Login';
import MenuAppBar from './MenuAppBar';
import Home from './Home';
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <MenuAppBar />
        <Route path="/" exact component={Home} />
        {/* Only Show Login page if not already logged in */}
        <Route path="/login" component={Login}></Route>
      </Router>
    </div>
  );
}

export default App;
