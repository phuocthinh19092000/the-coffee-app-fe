import { useEffect, useState } from 'react';
import SplashScreen from './pages/SplashScreen/SplashScreen';
import RouterPage from './routes/Router';
import Notification from './components/Notification/Notification';
import { onMessageListener } from './services/firebase';
import NotificationOrder from './interfaces/notificationOrder';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dataNotification, setDataNotification] = useState({} as NotificationOrder);
  const timeoutNotification = 5000;
  onMessageListener()
    .then((payload: MessagingPayload) => {
      if (payload.data) {
        const dataOrder = JSON.parse(payload.data.data);
        setDataNotification(dataOrder);
      }
    })
    .catch(() => {
    });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
    <>
      {isLoading ? (
        <SplashScreen />
      ) : (
        <>
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
          <RouterPage />
        </>
      )}
    </>
  );
}

export default App;
