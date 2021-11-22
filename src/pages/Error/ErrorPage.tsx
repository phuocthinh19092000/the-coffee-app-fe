import { useState, useRef, useEffect } from 'react';
import Login from '../HomePage/Login';
import Header from '../Header/Header';
import PopUpLogOut from '../../components/PopUpLogOut/PopUpLogOut';
import '../Error/ErrorPage.scss';
import Error from '../../components/Error/Error';

const ErrorPage = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);

  const [isShowLogout, setIsShowLogout] = useState(false);

  const [user, setUser] = useState(() => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    return user;
  });

  const ref = useRef<HTMLDivElement>(null);

  const hideFormHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      setIsShowLogin(false);
      setIsShowLogout(false);
    }
  };

  const clickOutsideHandler = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShowLogin(false);
      setIsShowLogout(false);
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
  };

  const showPopUpLogoutHandler = () => {
    setIsShowLogout(!isShowLogout);
  };
  return (
    <div className="error-page">
      <div ref={ref}>
        {isShowLogin && <Login />}
        {isShowLogout && <PopUpLogOut onClick={showPopUpLogoutHandler} />}
      </div>
      <div className={isShowLogin || isShowLogout ? 'filter' : ''}>
        <Header
          className="header"
          onClick={showLogin}
          isLoggedIn={Boolean(user)}
          userName={user?.username}
          onClickShowLogOut={showPopUpLogoutHandler}
        />
      </div>
      <div className="error-component">
        <Error />
      </div>
    </div>
  );
};

export default ErrorPage;
