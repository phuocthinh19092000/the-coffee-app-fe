import { useState, useRef, useEffect } from 'react';
import UserInformation from '../../share/assets/vector/UserInformation.svg';
import ExpandMore from '../../share/assets/vector/ExpandMore.svg';
import './CustomerInformation.scss';

type Props = {
  name: string;
};

const CustomerInformation = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClickInside = () => setIsMenuOpen(!isMenuOpen);

  const dropdownMenuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (dropdownMenuRef.current && !dropdownMenuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isMenuOpen]);

  return (
    <div className="block-customer-information" onClick={handleClickInside}>
      <img id="user-information" src={UserInformation} alt="Customer Information" />
      <span className="customer-name"> {props.name} </span>
      <div ref={dropdownMenuRef} className="dropdown">
        <img src={ExpandMore} className="drop-button" alt="expand more" onClick={handleClickInside} />
        {isMenuOpen && (
          <div className="dropdown-content">
            <a href="/orders">My Orders</a>
            <a href="/user/changeAvatar">Change Avatar</a>
            <a href="/user/changePassword">Change Password</a>
            <a href="/user/logout" id="accent-color">
              Log out
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInformation;
