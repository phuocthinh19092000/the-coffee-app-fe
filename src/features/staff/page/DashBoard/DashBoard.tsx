import { useEffect, useState } from 'react';
import LeftSideBar from '../../../../components/LeftSideBar/LeftSideBar';
import ListOrderStaff from '../../../../components/ListOrderStaff/ListOrderStaff';
import ToastNotification from '../../../../components/ToastNotification/ToatstNotification';
import { NotificationType } from '../../../../enum/NotificationType';
import { PositionToast } from '../../../../enum/PositionToast';
import { TabName } from '../../../../enum/TabName';
import { SocketProvider } from '../../../../utils/socketProvider';

const DashBoard = () => {
  const [tabName, setTabName] = useState(TabName.ORDERS);
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

  const handleClickChangeTab = (tabName: TabName) => {
    setTabName(tabName);
    // TODO: handle change tab content when click LeftSideBarItem
  };

  return (
    <>
      <SocketProvider>
        <div className="flex">
          <LeftSideBar currentTab={tabName} onClickChangeTab={(tabName: TabName) => handleClickChangeTab(tabName)} />
          <div className="w-full">
            <ListOrderStaff setIsShowNotification={setIsShowNotification} />
          </div>
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
