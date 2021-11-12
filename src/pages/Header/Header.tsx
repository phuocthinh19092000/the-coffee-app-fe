import React, { useEffect, useState } from 'react';
import OTSVLogo from '../../share/assets/img/OTSVLogo.png';
import SearchVector from '../../share/assets/img/SearchVector.png';
import CoffeeImg from '../../share/assets/img/CoffeeImg.png';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Index';
import './Header.scss';
import SearchItem from '../../components/SearchItem/SearchItem';
import DrinkItems from '../../json/seed_products.json';
import CustomerInformation from '../../components/CustomerInformation/CustomerInformation';
import useComponentVisible from '../../utils/useComponentVisible';
import { useRef } from 'react';
type TypeSearchItem = {
  id: number;
  name: string;
  price: number;
  type: string;
};
type Props = {
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickShowLogOut: React.MouseEventHandler<HTMLAnchorElement>;
  isLoggedIn: boolean;
  userName: string;
};
const Header = (props: Props) => {
  const [value, setValue] = useState('');
  const [displaySearchList, setDisplaySearchList] = useState(false);
  const [searchList, setSearchList] = useState([{} as TypeSearchItem]);

  const DivSearchItemsRef = useRef<HTMLDivElement>(null);
  const handleSearchDrink: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const clickOutsideHandler = (event: Event) => {
    if (DivSearchItemsRef.current && !DivSearchItemsRef.current.contains(event.target as Node)) {
      setDisplaySearchList(false);
    }
  };
  useEffect(() => {
    if (value) {
      const newSearchList = DrinkItems.filter((drinkItem) =>
        drinkItem.name.toLowerCase().includes(value.toLowerCase()),
      );
      setDisplaySearchList(newSearchList.length ? true : false);
      setSearchList(newSearchList);
    } else {
      setDisplaySearchList(false);
    }
  }, [value]);
  // Handle click outside
  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler, true);
    return () => {
      document.removeEventListener('click', clickOutsideHandler, true);
    };
  }, [displaySearchList]);

  return (
    <div className={props.className}>
      <img className="logo-header" src={OTSVLogo} alt={OTSVLogo} />
      <div className="search-container">
        <Input
          placeholder="Search drink"
          src={SearchVector}
          className="search-input"
          value={value}
          onChange={handleSearchDrink}
        />
        <div ref={DivSearchItemsRef}>
          {displaySearchList && (
            <div className="search-list">
              {searchList.map((searchItem) => (
                <SearchItem
                  key={searchItem.id}
                  src={CoffeeImg}
                  name={searchItem.name}
                  price={searchItem.price.toString()}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {props.isLoggedIn ? (
        <CustomerInformation name={props.userName} onClick={props.onClickShowLogOut} />
      ) : (
        <Button className="primary login" titleButton="Login" onClick={props.onClick} />
      )}
    </div>
  );
};
export default Header;
