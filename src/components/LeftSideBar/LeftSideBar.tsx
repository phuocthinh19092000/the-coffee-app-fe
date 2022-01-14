import './LeftSideBar.scss';
import Logo from '../../share/assets/img/OTSVLogo.png';
import OrderIcon from '../../share/assets/img/order-icon.png';
import ItemsIcon from '../../share/assets/img/item-icon.png';
import ReportIcon from '../../share/assets/img/report-icon.png';
import LogoutIcon from '../../share/assets/img/logout-icon.png';
import LeftSideBarItem from './Items/LeftSideBarItem';

const LeftSideBar = () => {
  return (
    <div className='left-side-bar'>
      <div className='left-side-bar__img'>
        <img src={Logo} alt='logo' />
      </div>
      <div className='left-side-bar__group-item'>
        <LeftSideBarItem src={OrderIcon} alt={'Order'} title={'Orders'} />
        <LeftSideBarItem src={ItemsIcon} alt={'Items'} title={'Items'} />
        <LeftSideBarItem src={ReportIcon} alt={'Report'} title={'Report'} />
      </div>
      <div className='left-side-bar__logout'>
        <img src={LogoutIcon} alt='' className='mr-[10px] w-fit h-fit' />
        <span className='text-accent-1'>Log Out</span>
      </div>
    </div>
  );
};
export default LeftSideBar;