import { useState, useRef, useEffect } from 'react';
import UserInformation from '../../share/assets/vector/UserInformation.svg';
import ExpandMore from '../../share/assets/vector/ExpandMore.svg';
import './CustomerInformation.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../storage/index';
type Props = {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const CustomerInformation = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { freeUnit, name } = useSelector((state: RootState) => state.userData.userInfo);

  // const [freeUnit, setFreeUnit] = useState(() => {
  //   const userJson = localStorage.getItem('user');
  //   const freeUnit = userJson ? JSON.parse(userJson).freeunit : 3;
  //   return freeUnit;
  // });

  const handleClickInside = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // const handleSetFreeUnit = (e: any) => {
  //   setFreeUnit(e.detail);
  // };

  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    // document.addEventListener('setFreeUnit', handleSetFreeUnit);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      // document.removeEventListener('setFreeUnit', handleSetFreeUnit);
    };
  }, [isMenuOpen]);

  return (
    <div ref={dropdownMenuRef} className="block-customer-information" onClick={handleClickInside}>
      <img className="block-customer-information__img" src={UserInformation} alt="Customer Information" />
      <span className="block-customer-information__span">{name}</span>
      <div className="menu-dropdown">
        <img src={ExpandMore} className="menu-dropdown__img" alt="expand more" />
        {isMenuOpen && (
          <div className="menu-dropdown__content">
            <a className="menu-dropdown__item" href="###">
              Today Free Unit: <span className="menu-dropdown__item--accent">{freeUnit}</span>
            </a>
            <a className="menu-dropdown__item" href="/orders">
              My Orders
            </a>
            <a className="menu-dropdown__item" href="/user/changeAvatar">
              Change Avatar
            </a>
            <a className="menu-dropdown__item" href="/user/changePassword">
              Change Password
            </a>
            <span className="menu-dropdown__item menu-dropdown__item--accent" onClick={props.onClick} id="accent-color">
              Log out
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInformation;
