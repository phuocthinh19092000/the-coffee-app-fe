import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorPage from '../pages/404Page/ErrorPage';
import ComingSoonPage from '../pages/ComingSoonPage/ComingSoonPage';
import HomePage from '../pages/HomePage/HomePage';
import LoginStaff from '../features/staff/page/Login-Staff/LoginStaff';
import DashBoard from '../features/staff/page/DashBoard/DashBoard';
// import PrivateRoute from './PrivateRoute/PrivateRoute';
import ProtectedSwitch from './ProtectedSwitch/ProtectedSwitch';
import { ROLE } from '../enum/Roles';
import { PROTECTED_STAFF_PATH } from '../constant';

const RouterPage = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginStaff} />
        <ProtectedSwitch
          path="/staff"
          redirectPath="/login"
          protectedPaths={PROTECTED_STAFF_PATH}
          roles={[ROLE.VENDOR]}
        >
          <Route exact path="/staff" component={DashBoard} />
        </ProtectedSwitch>
        <Route exact path="/user/changePassword" component={ComingSoonPage} />
        <Route component={ErrorPage} />
      </Switch>
    </Router>
  );
};

export default RouterPage;
