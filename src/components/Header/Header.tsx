import React, { useEffect, useState, useContext } from 'react';
import OTSVLogo from '../../share/assets/img/OTSVLogo.png';
import SearchVector from '../../share/assets/vector/iconSearch.svg';
import CoffeeImg from '../../share/assets/img/CoffeeImg.png';
import Input from '../Input/Input';
import Button from '../Button/Index';
import './Header.scss';
import SearchItem from '../SearchItem/SearchItem';
import DrinkItems from '../../json/seed_products.json';
import CustomerInformation from '../CustomerInformation/CustomerInformation';
import { ThemeContext } from '../../utils/ThemeProvider';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';
import { useRef } from 'react';
import { useHistory } from 'react-router';
type TypeSearchItem = {
  id: number;
  name: string;
  price: number;
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
    if (value.length >= 2) {
      const newSearchList = DrinkItems.filter((drinkItem) =>
        drinkItem.name.toLowerCase().includes(value.toLowerCase()),
      );
      setDisplaySearchList(newSearchList.length ? true : false);
      setSearchList(newSearchList);
    } else {
      setDisplaySearchList(false);
    }
  }, [value]);
  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler, true);
    return () => {
      document.removeEventListener('click', clickOutsideHandler, true);
    };
  }, [displaySearchList]);

  const history = useHistory();
  const goHome = () => {
    let path = `/`;
    history.push(path);
  };
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={props.className}>
      <div className="header__logo">
        <img src={OTSVLogo} alt={OTSVLogo} onClick={goHome} />
      </div>
      <div className="header__search-block">
        <Input
          placeholder="Search drink"
          src={SearchVector}
          className={props.isLoggedIn ? 'block-input--white' : 'block-input'}
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
      <div className="header__button">
        {props.isLoggedIn ? (
          <>
            <button className="header__button-toggle" onClick={toggleTheme}>
              {theme === 'Light' ? <HiMoon size={40} /> : <CgSun size={40} />}
            </button>
            <CustomerInformation name={props.userName} onClick={props.onClickShowLogOut} />
          </>
        ) : (
          <>
            <div className="header__button-toggle" onClick={toggleTheme}>
              {theme === 'Light' ? <HiMoon size={40} /> : <CgSun size={40} />}
            </div>
            <Button className="btn btn-primary btn-login" titleButton="Login" onClick={props.onClick} />
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
