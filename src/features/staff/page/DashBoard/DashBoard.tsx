import { useState } from 'react';
import LeftSideBar from '../../../../components/LeftSideBar/LeftSideBar';
import ListOrderStaff from '../../../../components/ListOrderStaff/ListOrderStaff';
import { TabName } from '../../../../enum/TabName';
const DashBoard = () => {
  const [tabName, setTabName] = useState(TabName.ORDERS);
  const handleClickChangeTab = (tabName: TabName) => {
    setTabName(tabName);
    // TODO: handle change tab content when click LeftSideBarItem
  };

  return (
    <div className="flex">
      <LeftSideBar currentTab={tabName} onClickChangeTab={(tabName: TabName) => handleClickChangeTab(tabName)} />
      <ListOrderStaff />
    </div>
  );
};
export default DashBoard;
