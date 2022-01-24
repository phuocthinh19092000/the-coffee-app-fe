import { ROLE } from '../../enum';
import { useSelector } from 'react-redux';
import { Redirect, Route, useLocation } from 'react-router-dom';
import { selectLoginState, selectUserState } from '../../features/auth/actions/auth';

type Props = {
  children: JSX.Element;
  roles: Array<ROLE>;
  path: string;
};

function PrivateRoute(props: Props) {
  const location = useLocation();
  const user = useSelector(selectUserState);
  const accessToken = useSelector(selectLoginState);
  const userHasRequiredRole = user && props.roles.includes(user.role as ROLE) ? true : false;
  if (accessToken && userHasRequiredRole) {
    return <Route path={props.path} render={() => props.children} />;
  }
  return (
    <Redirect
      to={{
        state: { from: location },
      }}
    />
  );
}

export default PrivateRoute;
