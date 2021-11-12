import React, { useState, useRef, useEffect } from 'react';
import Login from '../HomePage/Login';
import Header from '../../pages/Header/Header';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Index';
import OTSVLogo from '../../share/assets/img/OTSVLogo.png';
import SearchVector from '../../share/assets/img/SearchVector.png';
import CustomerInformation from '../../components/CustomerInformation/CustomerInformation';
import PopUpLogOut from '../../components/PopUpLogOut/PopUpLogOut';
import '../HomePage/styles.scss';
import ListDrinkItem from '../../components/ListDrinkItem/list-drink-item';
import { useHistory } from 'react-router-dom';

const HomePage = () => {
  let history = useHistory();

  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowLogout, setIsShowLogout] = useState(false);
  const [user, setUser] = useState(() => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    return user;
  });

  // Handle outside
  const ref = useRef<HTMLDivElement>(null);

  const hideFormHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      setIsShowLogin(false);
      setIsShowLogout(false);
      history.push('/');
    }
  };

  const clickOutsideHandler = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShowLogin(false);
      setIsShowLogout(false);
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

  const showPopUpLogoutHandler = () => {
    setIsShowLogout(!isShowLogout);
  };

  return (
    <>
      <Header
        className={`header ${isShowLogin || isShowLogout ? 'filter' : ''}`}
        onClick={showLogin}
        isLoggedIn={Boolean(user)}
        userName={user?.username}
        onClickShowLogOut={showPopUpLogoutHandler}
      />

      <div ref={ref}>
        {isShowLogin && <Login />}
        {isShowLogout && <PopUpLogOut onClick={showPopUpLogoutHandler} />}
      </div>
      <div className={` ${isShowLogin || isShowLogout ? 'filter' : ''}`}>
        <ListDrinkItem />
      </div>
    </>
  );
};
export default HomePage;
