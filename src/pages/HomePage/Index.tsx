import { useState, useRef, useEffect } from 'react';
import Login from '../HomePage/Login';
import Header from '../../pages/Header/Header';
import PopUpLogOut from '../../components/PopUpLogOut/PopUpLogOut';
import '../HomePage/styles.scss';
import ListDrinkItem from '../../components/ListDrinkItem/ListDrinkItem';
import { useHistory } from 'react-router-dom';
import image4 from '../../share/assets/img/image4.png';
import CategoryBar from '../../components/CategoryBar/CategoryBar';
import React from 'react';
import DrinkData from '../../json/seed_products.json';

const HomePage = () => {
  let history = useHistory();

  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowLogout, setIsShowLogout] = useState(false);
  const [listDrink, setListDrink] = useState(() => DrinkData.filter((itemDrink) => itemDrink.id === 1));
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
  const handelSetCategory = (id: number) => {
    setListDrink(DrinkData.filter((item) => item.categoryID === id));
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
      <div className={isShowLogin || isShowLogout ? 'filter' : ''}>
        <div className="background">
          <img src={image4} alt={image4} className="background-img" />
        </div>
        <div className="product">
          <div className="product-left">
            <CategoryBar onGetIdHandler={handelSetCategory} />
          </div>
          <div className="product-right">
            <ListDrinkItem listDrink={listDrink} />
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
