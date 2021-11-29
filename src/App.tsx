import HomePage from './pages/HomePage/HomePage';
import ErrorPage from './pages/404Page/ErrorPage';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ComingSoonPage from './pages/ComingSoonPage/ComingSoonPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />

        <Route
          exact
          path="/homepage"
          render={() => {
            return !!localStorage.getItem('user') ? <HomePage /> : <ComingSoonPage />;
          }}
        />
        <Route exact path="/orders" component={ComingSoonPage} />
        <Route exact path="/user/changeAvatar" component={ComingSoonPage} />
        <Route exact path="/user/changePassword" component={ComingSoonPage} />

        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
}

export default App;
