import { useState, useRef, useEffect } from 'react';
import UserInformation from '../../share/assets/vector/UserInformation.svg';
import ExpandMore from '../../share/assets/vector/ExpandMore.svg';
import './CustomerInformation.scss';

type Props = {
  name: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
};

const CustomerInformation = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      <span className="block-customer-information__span">{props.name}</span>
      <div className="menu-dropdown">
        <img src={ExpandMore} className="menu-dropdown__img" alt="expand more" />
        {isMenuOpen && (
          <div className="menu-dropdown__content">
            <a className="menu-dropdown__item" href="/orders">
              My Orders
            </a>
            <a className="menu-dropdown__item" href="/user/changeAvatar">
              Change Avatar
            </a>
            <a className="menu-dropdown__item" href="/user/changePassword">
              Change Password
            </a>
            <a className="menu-dropdown__item menu-dropdown__item--accent" onClick={props.onClick} id="accent-color">
              Log out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInformation;
