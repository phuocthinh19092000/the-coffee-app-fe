import React, { ChangeEvent, useEffect, useState } from 'react';
import OTSLogo from '../../share/assets/img/OTSLogo.png';
import SearchVector from '../../share/assets/vector/iconSearch.svg';
import CancelVector from '../../share/assets/vector/cancelVector.svg';
import NotFound from '../../share/assets/vector/NotFoundIcon.svg';
import Input from '../Input/Input';
import Button from '../Button/Index';
import PopUpLoginRight from '../../features/auth/components/PopUpLoginRight/PopUpLoginRight';
import SearchItem from '../SearchItem/SearchItem';
import CustomerInformation from '../CustomerInformation/CustomerInformation';
import useComponentVisible from '../../utils/useComponentVisible';
import Spinner from '../Spinner/Spinner';
import useDebounce from '../../Hook/useDebounce';
import { useHistory } from 'react-router';
import { Product } from '../../interfaces';
import { useAppDispatch } from '../../storage/hooks';
import { useSelector } from 'react-redux';
import { getSearchItems, searchLoadingState, selectSearchState } from '../../features/search/action/getSearchItemData';
import { getProductId } from '../../features/order/actions/order';
import { RequestState, ROLE } from '../../enum';
import { getFreeUnit, selectLoginState, selectUserState } from '../../features/auth/actions/auth';
import { getWebhook } from '../../features/webhook/action/webhook';
import { customerAccessRole } from '../../constant';

import './Header.scss';

const Header = () => {
  const [keyword, setKeyword] = useState('');
  const [ref, isShowSearchDrink, setIsShowSearchDrink] = useComponentVisible(false);
  const [popUpLoginRightRef, isShowPopUpLoginRight, setIsShowPopupLoginRight] = useComponentVisible(false);
  const debouncedKeyword = useDebounce(keyword, 500);
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { role } = useSelector(selectUserState);
  const auth = useSelector(selectLoginState);
  const searchItems = useSelector(selectSearchState);
  const isLoading = useSelector(searchLoadingState);
  const checkUser = auth && customerAccessRole.includes(role as ROLE);
  useEffect(() => {
    if (checkUser) {
      dispatch(getWebhook());
      dispatch(getFreeUnit());
    }
  }, []);

  useEffect(() => {
    if (keyword.length >= 2) {
      dispatch(getSearchItems(keyword.toLocaleLowerCase())).unwrap();
      setIsShowSearchDrink(true);
    } else {
      setIsShowSearchDrink(false);
    }
  }, [debouncedKeyword]);

  useEffect(() => {
    if (checkUser) {
      setIsShowPopupLoginRight(false);
    }
  }, [auth]);

  const handleSearchDrink: React.ChangeEventHandler<HTMLInputElement> = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  const handleClickSearchItem = (productId: string) => {
    dispatch(getProductId(productId));
    resetValue();
  };

  const handleOnFocus = () => {
    if (keyword.length >= 2) {
      setIsShowSearchDrink(true);
    }
  };

  useEffect(() => {
    if (keyword.length >= 2) {
      dispatch(getSearchItems(keyword.toLocaleLowerCase())).unwrap();
      setIsShowSearchDrink(true);
    } else {
      setIsShowSearchDrink(false);
    }
  }, [debouncedKeyword]);

  const goHome = () => {
    const path = `/`;
    history.push(path);
  };

  const resetValue = () => {
    setKeyword('');
  };

  return (
    <>
      <div className="header md:px-1 xxl:px-[20px] z-[1]">
        <div className="header__logo">
          <img className="h-full" src={OTSLogo} alt="Logo One Tech Stop" onClick={goHome} />
        </div>

        {isShowSearchDrink && <div className="background-blur" />}
        <div className={`header__search-block ${isShowPopUpLoginRight ? '' : 'z-[2]'}`} ref={ref}>
          <div className="xxl:block hidden">
            <Input
              placeholder="Search drink"
              src={keyword.length === 0 ? SearchVector : CancelVector}
              className="block-input--white block-input"
              value={keyword}
              onChange={handleSearchDrink}
              onClickFirstIcon={resetValue}
              onFocus={handleOnFocus}
            />
          </div>

          {isShowSearchDrink &&
            (isLoading === RequestState.PENDING ? (
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
        <div className={`${isShowSearchDrink || isShowPopUpLoginRight ? '' : 'z-[2]'} header__button`}>
          {checkUser ? (
            <CustomerInformation />
          ) : (
            <div className="md:min-w-[100px] xxl:min-w-[120px] ">
              <Button
                className="btn btn-primary btn-login"
                titleButton="Login"
                onClick={() => {
                  setIsShowPopupLoginRight(true);
                }}
              />
            </div>
          )}
        </div>
        {isShowPopUpLoginRight && (
          <div ref={popUpLoginRightRef} className="background-blur">
            <PopUpLoginRight />
          </div>
        )}
      </div>
    </>
  );
};
export default Header;
