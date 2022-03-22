import Product from '../../features/product/page/Product/Product';
import NotificationOrder from '../../interfaces/notificationOrder';
import Order from '../../interfaces/order';
import PopUpReceiveCanceledOrderCustomer from '../../features/orderStatus/components/PopUpReceiveCanceledOrderCustomer/PopUpReceiveCanceledOrderCustomer';
import Notification from '../../components/Notification/Notification';
import SplashScreen from '../SplashScreen/SplashScreen';
import SearchVector from '../../share/assets/vector/iconSearch.svg';
import MaskGroup from '../../share/assets/img/MaskGroup.jpg';
import useComponentVisible from '../../utils/useComponentVisible';
import MyOrder from '../../features/my-order/page/MyOrder/MyOrder';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Footer from '../../components/Footer/Footer';

import { onMessageListener } from '../../services/firebase';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import React, { useEffect, useState } from 'react';
import { initSocket, joinRoomCustomer, onListenEventCustomer } from '../../services/socketService';
import { SocketContext } from '../../utils/socketContext';
import { useSelector } from 'react-redux';
import { getFreeUnit, selectUserState } from '../../features/auth/actions/auth';
import { customerAccessRole, TabNameNavbar, timeoutNotification, timeOutSplashScreen } from '../../constant';
import { ROLE, SocketEvent } from '../../enum';
import { useAppDispatch } from '../../storage/hooks';

import '../../components/WrapperPage/WrapperPage.css';
import './HomePage.scss';

type NavbarBottomDirectionType = {
  [key: string]: () => void;
};

const HomePage = () => {
  const [navbarActive, setNavbarActive] = useState(TabNameNavbar.HOME_PAGE);
  const [dataNotification, setDataNotification] = useState({} as NotificationOrder);
  const [dataFormCanceledOrder, setDataFormCanceledOrder] = useState({} as Order);
  const [isAccessed, setIsAccessed] = useState(!!window.sessionStorage.getItem('isAccessed'));
  const [popUpRef, isPopUpOpen, setIsPopUpOpen] = useComponentVisible(false);

  const dispatch = useAppDispatch();

  const socket = initSocket();

  const user = useSelector(selectUserState);
  const isLoggedInCustomer = customerAccessRole.includes(user.role as ROLE);

  useEffect(() => {
    !isAccessed &&
      setTimeout(() => {
        setIsAccessed(true);
        window.sessionStorage.setItem('isAccessed', 'true');
      }, timeOutSplashScreen);
  }, []);

  useEffect(() => {
    if (isLoggedInCustomer) {
      joinRoomCustomer(socket, user._id);
      onListenEventCustomer(socket, SocketEvent.ORDER_CANCELED, receiveCanceledOrder);
    }

    return () => {
      socket.off(SocketEvent.ORDER_CANCELED);
      socket.close();
    };
  }, [user]);

  useEffect(() => {
    if (Object.entries(dataNotification).length > 0) {
      const timer = setTimeout(() => {
        setDataNotification({} as NotificationOrder);
      }, timeoutNotification);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [dataNotification]);

  const receiveCanceledOrder = (order: Order) => {
    setDataFormCanceledOrder(order);
    dispatch(getFreeUnit());
  };

  const onCloseFormCanceledOrder = () => {
    setDataFormCanceledOrder({} as Order);
  };

  onMessageListener().then((payload: MessagingPayload) => {
    if (payload.data?.data) {
      const dataOrder = JSON.parse(payload.data.data);
      setDataNotification(dataOrder);
    }
  });

  const showMyOderPopUp = () => {
    setIsPopUpOpen(true);
  };

  // TODO: Add logic to open/close CustomerInformation in object below

  const switchNavbarBottom: NavbarBottomDirectionType = {
    homePage: () => {
      setIsPopUpOpen(false);
    },
    myOrder: () => {
      setIsPopUpOpen(true);
    },
    information: () => {
      setIsPopUpOpen(false);
    },
  };
  const onClickChangeTabNavbarBottom = (navbar: string) => {
    if (navbar === navbarActive) {
      return;
    }

    switchNavbarBottom[navbar]();

    setNavbarActive(navbar);
  };

  return isAccessed ? (
    <>
      <SocketContext.Provider value={socket}>
        <div className="home-page">
          {/* <WrapperPage> */}
          <div className="w-full h-screen relative bg-grey-4">
            <div className="md:block hidden">
              <Header />
            </div>
            <div className="background">
              <img src={MaskGroup} alt="Mask Group Background" className="background-img" />
              <div className="xxl:hidden block m-auto">
                <Input
                  placeholder="Search drink"
                  src={SearchVector}
                  className="block-input--white block-input relative sm:bottom-1.5 md:bottom-[28px] m-auto"
                />
              </div>
            </div>
            <div className="w-full h-full">
              {Object.entries(dataNotification).length > 0 ? (
                <div onClick={showMyOderPopUp}>
                  <Notification
                    price={dataNotification.price}
                    title={dataNotification.title}
                    quantity={dataNotification.quantity}
                    status={dataNotification.status}
                    image={dataNotification.image}
                  />
                </div>
              ) : (
                <></>
              )}
              <div>
                <Product />
              </div>
            </div>
            <div className="w-full bottom-0 left-0">
              <Footer navbarIsActive={navbarActive} onClickChangeTab={onClickChangeTabNavbarBottom} />
            </div>
            {/* </WrapperPage> */}
          </div>
        </div>
      </SocketContext.Provider>

      {isPopUpOpen && (
        <div ref={popUpRef} className="background-blur">
          <MyOrder />
        </div>
      )}

      {Object.keys(dataFormCanceledOrder).length > 0 && (
        <div className="background-blur">
          <PopUpReceiveCanceledOrderCustomer order={dataFormCanceledOrder} onCloseForm={onCloseFormCanceledOrder} />
        </div>
      )}
    </>
  ) : (
    <SplashScreen />
  );
};
export default HomePage;
