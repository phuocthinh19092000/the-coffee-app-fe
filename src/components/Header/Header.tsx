import React, { useEffect, useState, useContext, ChangeEvent } from 'react';
import OTSVLogo from '../../share/assets/img/OTSVLogo.png';
import SearchVector from '../../share/assets/vector/iconSearch.svg';
import CancelVector from '../../share/assets/vector/cancelVector.svg';
import NotFound from '../../share/assets/vector/NotFoundIcon.svg';
import Input from '../Input/Input';
import Button from '../Button/Index';
import './Header.scss';
import SearchItem from '../SearchItem/SearchItem';
import CustomerInformation from '../CustomerInformation/CustomerInformation';
import { DarkMode } from '../../utils/ThemeProvider';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';
import { useHistory } from 'react-router';
import { Product } from '../../interfaces';
import { useAppDispatch } from '../../storage/hooks';
import { useSelector } from 'react-redux';
import { getSearchItems, selectSearchState, searchLoadingState } from '../../features/search/action/getSearchItemData';
import useDebounce from '../../Hook/useDebounce';
import { getProductId } from '../../features/order/actions/order';
import useComponentVisible from '../../utils/useComponentVisible';
import Spinner from '../Spinner/Spinner';
type Props = {
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClickShowLogOut: React.MouseEventHandler<HTMLAnchorElement>;
  onClickShowMyOrder: React.MouseEventHandler<HTMLAnchorElement>;
  isLoggedIn: boolean;
};
const Header = (props: Props) => {
  const [keyword, setKeyword] = useState('');
  const searchItems = useSelector(selectSearchState);
  const isLoading = useSelector(searchLoadingState);
  const debouncedKeyword = useDebounce(keyword, 500);
  const dispatch = useAppDispatch();
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const handleSearchDrink: React.ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClickSearchItem = (productId: string) => {
    dispatch(getProductId(productId));
    resetValue();
  };

  const handleOnFocus = () => {
    if (keyword.length >= 2) {
      setIsComponentVisible(true);
    }
  };

  useEffect(() => {
    if (keyword.length >= 2) {
      dispatch(getSearchItems(keyword.toLocaleLowerCase())).unwrap();
      setIsComponentVisible(true);
    } else {
      setIsComponentVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedKeyword]);

  const history = useHistory();
  const goHome = () => {
    let path = `/`;
    history.push(path);
  };
  const { theme, toggleTheme } = useContext(DarkMode);

  const resetValue = () => {
    setKeyword('');
  };
  return (
    <div className={props.className}>
      <div className="header__logo">
        <img src={OTSVLogo} alt={OTSVLogo} onClick={goHome} />
      </div>
      {isComponentVisible && <div className="background-blur" />}

      <div className="header__search-block z-[2]" ref={ref}>
        <Input
          placeholder="Search drink"
          src={keyword.length === 0 ? SearchVector : CancelVector}
          className={props.isLoggedIn ? 'block-input--white' : 'block-input'}
          value={keyword}
          onChange={handleSearchDrink}
          onClickFirstIcon={resetValue}
          onFocus={handleOnFocus}
        />
        {isComponentVisible &&
          (isLoading === 'pending' ? (
            <div className="search-list h-[150px] bg-white">
              <Spinner />
            </div>
          ) : searchItems.length ? (
            <div className="search-list">
              {searchItems.map((searchItem: Product) => (
                <SearchItem
                  key={searchItem.id}
                  avatarUrl={searchItem.images}
                  name={searchItem.name}
                  price={searchItem.price.toString()}
                  onClick={() => handleClickSearchItem(searchItem.id)}
                />
              ))}
            </div>
          ) : (
            <div className="not-found">
              <img src={NotFound} alt="Not Found" className="w-4 mb-1" />
              <p className="text-grey-1">No Drink is Found</p>
            </div>
          ))}
      </div>
      <div className={`${isComponentVisible ? '' : 'z-[2]'} header__button`}>
        {props.isLoggedIn ? (
          <>
            <button className="header__button-toggle" onClick={toggleTheme}>
              {theme === 'Light' ? <HiMoon size={40} /> : <CgSun size={40} />}
            </button>
            <CustomerInformation onClick={props.onClickShowLogOut} showMyOrder={props.onClickShowMyOrder} />
          </>
        ) : (
          <>
            <button className="header__button-toggle mt-1" onClick={toggleTheme}>
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
