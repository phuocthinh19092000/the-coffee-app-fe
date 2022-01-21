// import { useState, useRef } from 'react';
import Product from '../../features/product/page/Product/Product';
import WrapperPage from '../../components/WrapperPage/WrapperPage';
import Background from '../../components/Background/Background';
// import Toast from '../../components/Toast/Toast';
import './HomePage.scss';
// const ToastType = {
//   success: 'success',
//   fail: 'fail',
// };
import Notification from '../../components/Notification/Notification';
import { onMessageListener } from '../../services/firebase';
import NotificationOrder from '../../interfaces/notificationOrder';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [dataNotification, setDataNotification] = useState({} as NotificationOrder);
  const timeoutNotification = 5000;

  onMessageListener().then((payload: MessagingPayload) => {
    if (payload.data?.data) {
      console.log('In payload notification', payload.data.data);
      const dataOrder = JSON.parse(payload.data.data);
      setDataNotification(dataOrder);
    }
  });

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
  // const [showToast, setShowToast] = useState(false);

  // const toastRef = useRef({
  //   show() {
  //     setShowToast(true);
  //     setTimeout(() => {
  //       setShowToast(false);
  //     }, 3000);
  //   },
  // });

  // const handleSearchPopup = (item: typeof product) => {
  //   setSearchDrink(searchDrink);
  // };
  return (
    <div className="home-page">
      <WrapperPage>
        {Object.entries(dataNotification).length > 0 ? (
          <Notification
            price={dataNotification.price}
            title={dataNotification.title}
            quantity={dataNotification.quantity}
            status={dataNotification.status}
          />
        ) : (
          <></>
        )}

        {/* <Toast message={'Order changes saved successfully!'} type={ToastType.success} ref={toastRef} /> */}
        <div>
          <Background />
          <Product />
        </div>
        {/* <button
          className="home-page__btn--hidden"
          onClick={() => {
            toastRef.current.show();
          }}
        >
          Show Toast Notication
        </button> */}
      </WrapperPage>
    </div>
  );
};
export default HomePage;
