import React, { useEffect, useState, useContext } from 'react';
import OTSVLogo from '../../share/assets/img/OTSVLogo.png';
import SearchVector from '../../share/assets/vector/iconSearch.svg';
import CoffeeImg from '../../share/assets/img/CoffeeImg.png';
import Input from '../Input/Input';
import Button from '../Button/Index';
import './Header.scss';
import SearchItem from '../SearchItem/SearchItem';
import CustomerInformation from '../CustomerInformation/CustomerInformation';
import { ThemeContext } from '../../utils/ThemeProvider';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';
import { useRef } from 'react';
import { useHistory } from 'react-router';
import Product from '../../interfaces/product';
import productApi from '../../features/Product/api/productAPI';
type Props = {
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickShowLogOut: React.MouseEventHandler<HTMLAnchorElement>;
  isLoggedIn: boolean;
  // handleSearchPopup: (item: Product) => void;
};
const Header = (props: Props) => {
  const [value, setValue] = useState('');
  const [displaySearchList, setDisplaySearchList] = useState(false);
  const [searchList, setSearchList] = useState([] as Product[]);

  const DivSearchItemsRef = useRef<HTMLDivElement>(null);
  const handleSearchDrink: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
  };

  const clickOutsideHandler = (event: Event) => {
    if (DivSearchItemsRef.current && !DivSearchItemsRef.current.contains(event.target as Node)) {
      setDisplaySearchList(false);
    }
  };
  // useEffect(() => {
  //   if (setSearchList.length >= 2) {
  //     const newSearchList = setSearchList((item) => item.name.toLowerCase().includes(value.toLowerCase()));
  //     setDisplaySearchList(setSearchList.length ? true : false);
  //   } else {
  //     setDisplaySearchList(false);
  //   }
  // }, [value]);
  useEffect(() => {
    document.addEventListener('click', clickOutsideHandler, true);
    return () => {
      document.removeEventListener('click', clickOutsideHandler, true);
    };
  }, [displaySearchList]);

  const handleSearchPopup = (item: Product) => {
    async function fetchSearchApi() {
      const response = await productApi.getByCategory(value);
      setSearchList(response.data);
      setDisplaySearchList(true);
    }
    fetchSearchApi();
  };

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
                  avatarUrl={CoffeeImg}
                  name={searchItem.name}
                  price={searchItem.price.toString()}
                  onClick={() => handleSearchPopup(searchItem)}
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
            <CustomerInformation onClick={props.onClickShowLogOut} />
          </>
        ) : (
          <>
            <button className="header__button-toggle mt-15" onClick={toggleTheme}>
              {theme === 'Light' ? <HiMoon size={40} /> : <CgSun size={40} />}
            </button>
            <Button className="btn btn-primary btn-login" titleButton="Login" onClick={props.onClick} />
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
