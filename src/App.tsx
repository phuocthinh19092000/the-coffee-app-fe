import React from 'react';
import Login from './pages/HomePage/Login';
import HomePage from './pages/HomePage/Index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage}></Route>
        <Route path="/login" component={HomePage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
