import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/Login/LoginForm';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route
          exact
          path="/login"
          render={() => {
            return !!localStorage.getItem('user') ? <Redirect to="/" /> : <LoginForm />;
          }}
        />
        <Route
          exact
          path="/homepage"
          render={() => {
            return !!localStorage.getItem('user') ? <HomePage /> : <Redirect to="/login" />;
          }}
        />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
