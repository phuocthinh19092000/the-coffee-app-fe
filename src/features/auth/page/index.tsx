import { useAppDispatch } from '../../../storage/hooks';
import { login } from '../actions/login';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(login({ username: 'thanhnhan', password: 'thanhnhan' }));
  };

  return <button onClick={handleLogin}>Login</button>;
};

export default LoginPage;
