import './LeftSideBar.scss';
import Logo from '../../share/assets/img/OTSVLogo.png';
import OrderIcon from '../../share/assets/vector/OrderVector.svg';
import ItemsIcon from '../../share/assets/vector/MenuVector.svg';
import ReportIcon from '../../share/assets/vector/ReportVector.svg';
import LogoutIcon from '../../share/assets/img/logout-icon.png';
import LeftSideBarItem from './Items/LeftSideBarItem';
import { TabName } from '../../enum/TabName';
import { useHistory } from 'react-router-dom';
type Props = {
  onClickChangeTab(tabName: TabName): void;
  currentTab: TabName;
};
const LeftSideBar = (props: Props) => {
  const history = useHistory();
  const goHome = () => {
    let path = `/`;
    history.push(path);
  };
  return (
    <div className="left-side-bar">
      <div className="left-side-bar__img">
        <img src={Logo} alt="logo" className="w-[100px]" onClick={goHome} />
      </div>
      <div className="left-side-bar__group-item">
        <LeftSideBarItem
          isActive={props.currentTab === TabName.ORDERS}
          src={OrderIcon}
          alt="Order"
          title="Orders"
          onClickChangeTab={() => props.onClickChangeTab(TabName.ORDERS)}
        />
        <LeftSideBarItem
          isActive={props.currentTab === TabName.ITEM}
          src={ItemsIcon}
          alt="Items"
          title="Items"
          onClickChangeTab={() => props.onClickChangeTab(TabName.ITEM)}
        />
        <LeftSideBarItem
          isActive={props.currentTab === TabName.REPORT}
          src={ReportIcon}
          alt="Report"
          title="Report"
          onClickChangeTab={() => props.onClickChangeTab(TabName.REPORT)}
        />
      </div>
      <div className="left-side-bar__logout">
        <img src={LogoutIcon} alt="" className="mr-[10px] w-fit h-fit" />
        <span className="text-accent-1">Log Out</span>
      </div>
    </div>
  );
};
export default LeftSideBar;
