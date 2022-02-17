import { useEffect, useState } from 'react';
import LeftSideBar from '../../../../components/LeftSideBar/LeftSideBar';
import ListOrderStaff from '../ListOrderStaff/ListOrderStaff';
import ToastNotification from '../../../../components/ToastNotification/ToatstNotification';
import { NotificationType } from '../../../../enum/NotificationType';
import { PositionToast } from '../../../../enum/PositionToast';
import { TabIcon, TabName } from '../../../../constant';
import { SocketProvider } from '../../../../utils/socketProvider';
import ListProductStaff from '../ProductPage/ListProductStaff';

const DashBoard = () => {
  const [tabName, setTabName] = useState(TabName.STAFF.ORDER);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const timeOutNotification = 2000;

  useEffect(() => {
    if (isShowNotification) {
      const timer = setTimeout(() => {
        setIsShowNotification(false);
      }, timeOutNotification);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [isShowNotification]);

  const handleClickChangeTab = (tabName: string) => {
    setTabName(tabName);
  };

  const switchPage = () => {
    switch (tabName) {
      case TabName.STAFF.ORDER:
        return <ListOrderStaff setIsShowNotification={setIsShowNotification} />;
      case TabName.STAFF.ITEM:
        return <ListProductStaff />;
    }
  };
  return (
    <>
      <SocketProvider>
        <div className="flex">
          <LeftSideBar
            currentTab={tabName}
            listTabName={Object.values(TabName.STAFF)}
            listTabIcon={Object.values(TabIcon.STAFF)}
            onClickChangeTab={handleClickChangeTab}
          />
          <div className="w-full">{switchPage()}</div>
        </div>
      </SocketProvider>
      {isShowNotification && (
        <ToastNotification
          type={NotificationType.SUCCESS}
          message="Order Status has been reminded"
          position={PositionToast.TOP_CENTER}
        />
      )}
    </>
  );
};
export default DashBoard;
