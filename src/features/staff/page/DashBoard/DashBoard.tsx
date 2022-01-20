import LeftSideBar from '../../../../components/LeftSideBar/LeftSideBar';
import ListOrderStaff from '../../../../components/ListOrderStaff/ListOrderStaff';

const DashBoard = () => {
  const handleClickChangeTab = () => {
    // TODO: handle remove and add css active for LeftSideBarItem
    // handle change tab content when click LeftSideBarItem
    // implement css className 'active' for LeftSideBarItem ***
  };

  return (
    <div className="flex">
      <LeftSideBar onClickChangeTab={handleClickChangeTab} />
      <ListOrderStaff />
    </div>
  );
};
export default DashBoard;
