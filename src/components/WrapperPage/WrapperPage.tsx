import React, { useState, useRef, useEffect, ReactChild } from 'react';
import Header from '../Header/Header';
import PopUpLogOut from '../../features/auth/components/PopUpLogOut/PopUpLogOut';
import './WrapperPage.scss';
import Footer from '../Footer/Footer';
import PopUpLoginRight from '../../features/auth/components/PopUpLoginRight/PopUpLoginRight';
import { useSelector } from 'react-redux';
import { selectLoginState } from '../../features/auth/actions/login';
import MyOrder from '../../features/my-order/page/MyOrder/MyOrder';
import { getMyOrders, getMyOrderState } from '../../features/my-order/actions/historyOrder';
import { useAppDispatch } from '../../storage/hooks';
type Props = {
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
  // handleSearchPopup: (item: product) => void;
};

const WrapperPage = (props: Props) => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowLogout, setIsShowLogout] = useState(false);
  const [isShowMyOrder, setIsShowMyOrder] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const auth = useSelector(selectLoginState);
  const dispatch = useAppDispatch();
  const orderData = useSelector(getMyOrderState);
  const hideFormHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      setIsShowLogin(false);
      setIsShowLogout(false);
      setIsShowMyOrder(false);
    }
  };

  const clickOutsideHandler = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShowLogin(false);
      setIsShowLogout(false);
      setIsShowMyOrder(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', hideFormHandler, true);
    document.addEventListener('click', clickOutsideHandler, true);
    return () => {
      document.removeEventListener('keydown', hideFormHandler, true);
      document.removeEventListener('click', clickOutsideHandler, true);
    };
  }, []);

  useEffect(() => {
    async function fetchOrders() {
      await dispatch(getMyOrders()).unwrap();
    }
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowMyOrder])

  const showLogin = () => {
    setIsShowLogin(!isShowLogin);
  };

  const showPopUpLogoutHandler = () => {
    setIsShowLogout(!isShowLogout);
  };
  const showPopUpMyOrder = () => {
    setIsShowMyOrder(!isShowMyOrder);
  };
  const hideMyOrder = () => {
    setIsShowMyOrder(false);
  }
  return (
    <div className="wrapper-page">
      <div ref={ref}>
        {!auth && isShowLogin && <PopUpLoginRight />}
        {auth && isShowMyOrder && <MyOrder listOrder={orderData} onClick={hideMyOrder}/>}
        {auth && isShowLogout && <PopUpLogOut onClick={showPopUpLogoutHandler} />}
      </div>

      <div
        className={
          (!auth && isShowLogin) || (auth && isShowLogout) ? 'wrapper-page--filter' : ''
        }
      >
        <Header
          className={auth ? 'header header--grey' : 'header'}
          onClick={showLogin}
          isLoggedIn={!!auth}
          onClickShowLogOut={showPopUpLogoutHandler}
          onClickShowMyOrder={showPopUpMyOrder}
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