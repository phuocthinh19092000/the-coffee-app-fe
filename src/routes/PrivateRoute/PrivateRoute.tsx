import { ROLE } from '../../enum';
import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom';
import { selectLoginState, selectUserState } from '../../features/auth/actions/auth';

interface Props extends RouteProps {
  roles: Array<ROLE>;
}

function PrivateRoute(props: Props) {
  const { children, roles, path, ...rest } = props;
  const location = useLocation();
  const user = useSelector(selectUserState);
  const accessToken = useSelector(selectLoginState);
  const userHasRequiredRole = user && roles.includes(user.role as ROLE) ? true : false;
  return (
    <Route
      {...rest}
      path={path}
      render={() =>
        accessToken && userHasRequiredRole ? (
          children
        ) : (
          <Redirect
            to={{
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
