import React, { ReactChild, useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import PopUpLogOut from '../../features/auth/components/PopUpLogOut/PopUpLogOut';
import Footer from '../Footer/Footer';
import PopUpLoginRight from '../../features/auth/components/PopUpLoginRight/PopUpLoginRight';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../features/auth/actions/auth';
import MyOrder from '../../features/my-order/page/MyOrder/MyOrder';
import { ROLE } from '../../enum';

type Props = {
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
  // handleSearchPopup: (item: product) => void;
};

const WrapperPage = (props: Props) => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const [isShowLogout, setIsShowLogout] = useState(false);
  const [isShowMyOrder, setIsShowMyOrder] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const user = useSelector(selectUserState);
  const isLoggedInCustomer = user.role === ROLE.CUSTOMER;

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
  };
  return (
    <div className="w-full h-full relative bg-grey-4">
      <div ref={ref}>
        {!isLoggedInCustomer && isShowLogin && <PopUpLoginRight />}
        {isLoggedInCustomer && isShowMyOrder && <MyOrder onClick={hideMyOrder} />}
        {isLoggedInCustomer && isShowLogout && <PopUpLogOut onClick={showPopUpLogoutHandler} />}
      </div>

      <div className={(!isLoggedInCustomer && isShowLogin) || (isLoggedInCustomer && isShowLogout) ? 'blur-sm' : ''}>
        <Header
          className={isLoggedInCustomer ? 'header header--grey' : 'header'}
          onClick={showLogin}
          isLoggedIn={isLoggedInCustomer}
          onClickShowLogOut={showPopUpLogoutHandler}
          onClickShowMyOrder={showPopUpMyOrder}
          // handleSearchPopup={(item) => props.handleSearchPopup(item.name)}
        />
        <div className="w-full h-full">{props.children}</div>
        <div className="w-full bottom-0 left-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default WrapperPage;
