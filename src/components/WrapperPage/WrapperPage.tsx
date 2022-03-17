import React, { ReactChild } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchVector from '../../share/assets/vector/iconSearch.svg';
import MaskGroup from '../../share/assets/img/MaskGroup.jpg';
import Input from '../Input/Input';

import { useSelector } from 'react-redux';
import { selectUserState } from '../../features/auth/actions/auth';
import { ROLE } from '../../enum';
import { customerAccessRole } from '../../constant';

import './WrapperPage.css';

type Props = {
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
};

const WrapperPage = (props: Props) => {
  const user = useSelector(selectUserState);
  const isLoggedInCustomer = customerAccessRole.includes(user.role as ROLE);

  return (
    <div className="w-full h-full relative bg-grey-4">
      <div className="md:block hidden">
        <Header isLoggedIn={isLoggedInCustomer} />
      </div>
      <div className="background">
        <img src={MaskGroup} alt="Mask Group Background" className="background-img" />
        <div className="xxl:hidden block m-auto">
          <Input
            placeholder="Search drink"
            src={SearchVector}
            className={'block-input--white block-input relative sm:bottom-1.5 md:bottom-[28px] m-auto'}
          />
        </div>
      </div>
      <div className="w-full h-full">{props.children}</div>
      <div className="w-full bottom-0 left-0">
        <Footer />
      </div>
    </div>
  );
};

export default WrapperPage;
