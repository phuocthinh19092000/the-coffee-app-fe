import React from 'react';
import { useAppSelector, useAppDispatch } from '../../../storage/hooks';
import { login, selectLoginState } from '../actions/login';

const LoginPage = () => {
  const loginData = useAppSelector(selectLoginState);
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    dispatch(login({ username: 'thanhnhan', password: 'thanhnhan' }))
  }

  return (
    <button onClick={handleLogin}>Login</button>
  )
}

export default LoginPage;