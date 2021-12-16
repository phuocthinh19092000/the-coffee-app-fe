import { useState, useRef, useEffect, ReactChild } from 'react';
import Header from '../Header/Header';
import PopUpLogOut from '../PopUpLogOut/PopUpLogOut';

import './WrapperPage.scss';
import Footer from '../Footer/Footer';
import PopUpLoginRight from '../PopUpLoginRight/PopUpLoginRight';
type Props = {
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
  // handleSearchPopup: (item: Product) => void;
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
    <div className="wrapper-page">
      <div ref={ref}>
        {isShowLogin && <PopUpLoginRight />}
        {isShowLogout && <PopUpLogOut onClick={showPopUpLogoutHandler} />}
      </div>

      <div className={isShowLogin || isShowLogout ? 'wrapper-page--filter' : ''}>
        <Header
          className={user ? 'header header--grey' : 'header'}
          onClick={showLogin}
          isLoggedIn={Boolean(user)}
          fullName={user?.fullname}
          onClickShowLogOut={showPopUpLogoutHandler}
          // handleSearchPopup={(item) => props.handleSearchPopup(item.name)}
        />
        <div className="wrapper-page__container">{props.children}</div>
        <div className="wrapper-page__footer">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default WrapperPage;
