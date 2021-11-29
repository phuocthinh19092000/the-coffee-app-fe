import { useState, useRef, useEffect, ReactChild } from 'react';
import Header from '../Header/Header';
import Login from '../../pages/Login/Login';
import PopUpLogOut from '../PopUpLogOut/PopUpLogOut';

import './WrapperPage.scss';
type Props = {
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
};

const WrapperPage = (props: Props) => {

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
    <>
      <div ref={ref}>
        {isShowLogin && <Login />}
        {isShowLogout && <PopUpLogOut onClick={showPopUpLogoutHandler} />}
      </div>

      <div className={isShowLogin || isShowLogout ? 'wrapper-page--filter' : ''}>
        <Header
          className={user ? 'header header--grey' : 'header'}
          onClick={showLogin}
          isLoggedIn={Boolean(user)}
          userName={user?.username}
          onClickShowLogOut={showPopUpLogoutHandler}
        />
        {props.children}
      </div>

    </>
  );
};

export default WrapperPage;
