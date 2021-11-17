import React from 'react';
import HomePage from './pages/HomePage/Index';
import Login from './pages/HomePage/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={HomePage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
