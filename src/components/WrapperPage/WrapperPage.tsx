import React, { ReactChild, useEffect, useRef, useState } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import PopUpLoginRight from '../../features/auth/components/PopUpLoginRight/PopUpLoginRight';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../features/auth/actions/auth';
import { ROLE } from '../../enum';
import { customerAccessRole } from '../../constant';

type Props = {
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
  // handleSearchPopup: (item: product) => void;
};

const WrapperPage = (props: Props) => {
  const [isShowLogin, setIsShowLogin] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const user = useSelector(selectUserState);
  const isLoggedInCustomer = customerAccessRole.includes(user.role as ROLE);

  const hideFormHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.key === 'Esc') {
      setIsShowLogin(false);
    }
  };

  const clickOutsideHandler = (event: Event) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setIsShowLogin(false);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', hideFormHandler, true);
    document.addEventListener('click', clickOutsideHandler, true);
    return () => {
      document.removeEventListener('keydown', hideFormHandler, true);
      document.removeEventListener('click', clickOutsideHandler, true);
    };
  }, []);

  const showLogin = () => {
    setIsShowLogin(!isShowLogin);
  };

  return (
    <div className="w-full h-full relative bg-grey-4">
      <div ref={ref}>{!isLoggedInCustomer && isShowLogin && <PopUpLoginRight />}</div>

      <div className={!isLoggedInCustomer && isShowLogin ? 'blur-sm' : ''}>
        <Header
          className={isLoggedInCustomer ? 'header header--grey' : 'header'}
          onClick={showLogin}
          isLoggedIn={isLoggedInCustomer}
        />
        <div className="w-full h-full">{props.children}</div>
        <div className="w-full bottom-0 left-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default WrapperPage;
