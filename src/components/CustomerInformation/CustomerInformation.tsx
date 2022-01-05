import React, { useState, useRef, useEffect } from 'react';
import UserInformation from '../../share/assets/vector/UserInformation.svg';
import ExpandMore from '../../share/assets/vector/ExpandMore.svg';
import './CustomerInformation.scss';
import { useSelector } from 'react-redux';
import { getUserDataState } from '../../features/auth/actions/getUserInfo';
type Props = {
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  showMyOrder: React.MouseEventHandler<HTMLAnchorElement>;
};

const CustomerInformation = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { name, freeUnit } = useSelector(getUserDataState);

  const handleClickInside = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
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
            <span className="menu-dropdown__item">
              Today Free Unit: <span className="menu-dropdown__item--accent">{freeUnit}</span>
            </span>
            <span className="menu-dropdown__item" onClick={props.showMyOrder}>
              My Orders
            </span>
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
