import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import WrapperPage from './components/WrapperPage/WrapperPage';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/wrapper">
          <WrapperPage />
        </Route>
        <Route>
          <ErrorPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
