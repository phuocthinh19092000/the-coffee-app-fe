import { useState, useEffect } from 'react';
import { timeoutShowNotification } from '../constant';
import { NotificationParams } from '../interfaces';

export default function useClearNotification(timeOut?: number) {
  const [typeShowNotification, setTypeShowNotification] = useState<NotificationParams>({} as NotificationParams);

  useEffect(() => {
    if (typeShowNotification.message) {
      const timer = setTimeout(() => {
        setTypeShowNotification({} as NotificationParams);
      }, timeOut || timeoutShowNotification);

      return () => {
        clearTimeout(timer);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeShowNotification]);

  return { typeShowNotification, setTypeShowNotification };
}
