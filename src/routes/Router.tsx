import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorPage from '../pages/404Page/ErrorPage';
import ComingSoonPage from '../pages/ComingSoonPage/ComingSoonPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginStaff from '../features/staff/page/Login-Staff/LoginStaff';

const RouterPage = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={HomePage} />
        
        <Route
          exact
          path='/homepage'
          render={() => {
            return !!localStorage.getItem('user') ? <HomePage /> : <ComingSoonPage />;
          }}
        />
        
        <Route exact path='/staff-login' component={LoginStaff} />
        <Route exact path='/user/changePassword' component={ComingSoonPage} />
        
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default RouterPage;
