import React from 'react';
import OTSVLogo from '../../share/assets/img/OTSVLogo.png';
import SearchVector from '../../share/assets/img/SearchVector.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Index';
import './Header.scss';
const Header = () => {
  return (
    <div className="header">
      <img src={OTSVLogo} alt={OTSVLogo} />
      <Input placeholder="Search drink" src={SearchVector} className="search-input" />
      <Button className="primary login" titleButton="Login" />
    </div>
  );
};
export default Header;
