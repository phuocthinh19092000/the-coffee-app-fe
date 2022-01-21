import { ROLE } from '../../enum';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { selectLoginState, selectUserState } from '../../features/auth/actions/auth';
import AccessDenied from '../../pages/AccessDenied/AccessDenied';

type Props = {
  children: JSX.Element;
  role: ROLE;
  path: string;
};

function PrivateRoute(props: Props) {
  const location = useLocation();
  const user = useSelector(selectUserState);
  const accessToken = useSelector(selectLoginState);
  const userHasRequiredRole = user && props.role === user.role ? true : false;

  if (!accessToken) {
    return (
      <Redirect
        to={{
          pathname: '/',
          state: { from: location },
        }}
      />
    );
  }

  if (accessToken && !userHasRequiredRole) {
    return <AccessDenied />;
  }

  return <Route path={props.path} render={({ location }) => props.children}></Route>;
}

export default PrivateRoute;
