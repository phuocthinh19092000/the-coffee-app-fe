import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorPage from '../pages/404Page/ErrorPage';
import ComingSoonPage from '../pages/ComingSoonPage/ComingSoonPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginStaff from '../features/staff/page/Login-Staff/LoginStaff';
import DashBoard from '../features/staff/page/DashBoard/DashBoard';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { ROLE } from '../enum/Roles';

const RouterPage = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginStaff} />
        <PrivateRoute path="/staff" roles={[ROLE.VENDOR]}>
          <DashBoard />
        </PrivateRoute>

        <Route exact path="/user/changePassword" component={ComingSoonPage} />

        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default RouterPage;
