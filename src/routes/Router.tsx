import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorPage from '../pages/404Page/ErrorPage';
import ComingSoonPage from '../pages/ComingSoonPage/ComingSoonPage';
import HomePage from '../pages/HomePage/HomePage';
import Counter from '../features/counter';
import Login from '../features/auth/page';

const RouterPage = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/counter" component={Counter} />
        <Route exact path="/login" component={Login} />
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
};

export default RouterPage;
