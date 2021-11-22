import { useState, useRef, useEffect } from 'react';
import Login from '../HomePage/Login';
import Header from '../../pages/Header/Header';
import PopUpLogOut from '../../components/PopUpLogOut/PopUpLogOut';
import '../HomePage/styles.scss';
import image4 from '../../share/assets/img/image4.png';
import Product from '../Product/Product';

const HomePage = () => {
  const [isShowLogin, setIsShowLogin] = useState(false);

  const [isShowLogout, setIsShowLogout] = useState(false);

  // Component Free Unit:
  // When create order successfully, create a callback to call the state: setFreeUnit(freeUnit-...); to update the freeUnit

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
      <div className={isShowLogin || isShowLogout ? 'filter' : ''}>
        <Header
          className="header"
          onClick={showLogin}
          isLoggedIn={Boolean(user)}
          userName={user?.username}
          onClickShowLogOut={showPopUpLogoutHandler}
        />
        <div className="background">
          <img src={image4} alt={image4} className="background-img" />
        </div>
        <Product />
      </div>
    </>
  );
};
export default HomePage;
