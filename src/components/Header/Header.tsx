import React, { ChangeEvent, useEffect, useState } from 'react';
import OTSVLogo from '../../share/assets/img/OTSVLogo.png';
import SearchVector from '../../share/assets/vector/iconSearch.svg';
import CancelVector from '../../share/assets/vector/cancelVector.svg';
import NotFound from '../../share/assets/vector/NotFoundIcon.svg';
import Input from '../Input/Input';
import Button from '../Button/Index';
import './Header.scss';
import SearchItem from '../SearchItem/SearchItem';
import CustomerInformation from '../CustomerInformation/CustomerInformation';
import { useHistory } from 'react-router';
import { Product } from '../../interfaces';
import { useAppDispatch } from '../../storage/hooks';
import { useSelector } from 'react-redux';
import { getSearchItems, searchLoadingState, selectSearchState } from '../../features/search/action/getSearchItemData';
import useDebounce from '../../Hook/useDebounce';
import { getProductId } from '../../features/order/actions/order';
import useComponentVisible from '../../utils/useComponentVisible';
import Spinner from '../Spinner/Spinner';
import { RequestState } from '../../enum';
import { getFreeUnit, selectLoginState } from '../../features/auth/actions/auth';
import { getWebhook } from '../../features/webhook/action/webhook';
import PopUpLoginRight from '../../features/auth/components/PopUpLoginRight/PopUpLoginRight';
type Props = {
  className: string;
  isLoggedIn: boolean;
};
const Header = (props: Props) => {
  const dispatch = useAppDispatch();
  const [keyword, setKeyword] = useState('');

  const auth = useSelector(selectLoginState);
  const searchItems = useSelector(selectSearchState);
  const isLoading = useSelector(searchLoadingState);

  const debouncedKeyword = useDebounce(keyword, 500);

  const [ref, isComponentVisible, setIsComponentVisible] = useComponentVisible(false);
  const [popUpLoginRightRef, isShowPopUpLoginRight, setIsShowPopupLoginRight] = useComponentVisible(false);

  useEffect(() => {
    if (auth) {
      dispatch(getWebhook());
      dispatch(getFreeUnit());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const resetValue = () => {
    setKeyword('');
  };

  useEffect(() => {
    if (auth) {
      setIsShowPopupLoginRight(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <div className={props.className}>
      <div className="header__logo">
        <img src={OTSVLogo} alt={OTSVLogo} onClick={goHome} />
      </div>
      {isComponentVisible && <div className="background-blur" />}

      <div className={`header__search-block ${isShowPopUpLoginRight ? '' : 'z-[2]'}`} ref={ref}>
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
      <div className={`${isComponentVisible || isShowPopUpLoginRight ? '' : 'z-[2]'} header__button`}>
        {props.isLoggedIn ? (
          <CustomerInformation />
        ) : (
          <Button
            className="btn btn-primary btn-login"
            titleButton="Login"
            onClick={() => {
              setIsShowPopupLoginRight(true);
            }}
          />
        )}
      </div>

      {isShowPopUpLoginRight && (
        <div ref={popUpLoginRightRef} className="background-blur">
          <PopUpLoginRight />
        </div>
      )}
    </div>
  );
};
export default Header;
