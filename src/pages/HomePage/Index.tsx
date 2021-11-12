import React, { useState, useRef, useEffect } from 'react';
import Login from '../HomePage/Login';
import Header from '../../pages/Header/Header';
import '../HomePage/styles.scss';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  let history = useHistory();

  const [isShowLogin, setIsShowLogin] = useState(false);

  const [user, setUser] = useState(() => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    return user;
  });

  // Handle outside
  const ref = useRef<HTMLDivElement>(null);
  const hideFormHandler = (event: KeyboardEvent) => {
    if ((event.key === 'Escape' || event.key === 'Esc') && isShowLogin === true) {
      setIsShowLogin(!isShowLogin);
      history.push('/');
    }
  };

  const clickOutsideHandler = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node) && isShowLogin === true) {
      setIsShowLogin(!isShowLogin);
      history.push('/');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', hideFormHandler, true);
    document.addEventListener('click', clickOutsideHandler, true);
    return () => {
      document.removeEventListener('keydown', hideFormHandler, true);
      document.removeEventListener('click', clickOutsideHandler, true);
    };
  });

  const showLogin = () => {
    setIsShowLogin(!isShowLogin);
    history.push('/login');
  };

  return (
    <>
      <Header
        className={`header ${isShowLogin ? 'filter' : ''}`}
        onClick={showLogin}
        isLoggedIn={Boolean(user)}
        userName={user?.username}
      />
      <div ref={ref}>{isShowLogin && <Login></Login>}</div>
    </>
  );
};
export default HomePage;
