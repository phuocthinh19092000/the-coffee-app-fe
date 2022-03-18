import './Footer.css';

import IconHome from '../../share/assets/vector/IconHome.svg';
import IconManageOrder from '../../share/assets/vector/IconManageOrder.svg';
import IconProfile from '../../share/assets/vector/IconProfile.svg';

const Footer = () => {
  // TODO: Handle click to show page for each icon

  /**
   * URI Icon Home Active: '../../share/assets/vector/IconHomeActive.svg'
   * URI Icon Order Active: '../../share/assets/vector/IconManageOrderActive.svg'
   * URI Icon Profile Active: '../../share/assets/vector/IconProfileActive.svg'
   **/

  return (
    <div className="md:hidden block">
      <div className="footer ">
        <img src={IconHome} alt="Icon Home" />
        <img src={IconManageOrder} alt="Icon Home" />
        <img src={IconProfile} alt="Icon Home" />
      </div>
    </div>
  );
};

export default Footer;
