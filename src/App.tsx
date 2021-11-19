import HomePage from './pages/HomePage/Index';
import ErrorPage from './pages/Error/ErrorPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage}></Route>
        <Route path="*" component={ErrorPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;
