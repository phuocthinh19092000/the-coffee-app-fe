import React from 'react';
import OTSVLogo from '../../share/assets/img/OTSVLogo.png';
import SearchVector from '../../share/assets/img/SearchVector.png';
import CoffeeImg from '../../share/assets/img/CoffeeImg.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Index';
import './Header.scss';
import SearchItem from '../../components/SearchItem/SearchItem';
import CustomerInformation from '../../components/CustomerInformation/CustomerInformation';
const Header = () => {
  return (
    <div className="header">
      <img className="logo-header" src={OTSVLogo} alt={OTSVLogo} />
      <div className="search-container">
        <Input placeholder="Search drink" src={SearchVector} className="search-input" />
        <div className="search-list">
          <SearchItem src={CoffeeImg} />
          <SearchItem src={CoffeeImg} />
          <SearchItem src={CoffeeImg} />
          <SearchItem src={CoffeeImg} />
          <SearchItem src={CoffeeImg} />
          <SearchItem src={CoffeeImg} />
        </div>
      </div>

      <Button className="primary login" titleButton="Login" />
    </div>
  );
};
export default Header;
