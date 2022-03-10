import Product from '../../features/product/page/Product/Product';
import WrapperPage from '../../components/WrapperPage/WrapperPage';
import Background from '../../components/Background/Background';
import './HomePage.scss';

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

        <div>
          <Background />
          <Product />
        </div>

      </WrapperPage>
    </div>
  );
};
export default HomePage;
