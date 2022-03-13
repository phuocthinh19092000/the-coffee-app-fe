import React, { ReactChild } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../features/auth/actions/auth';
import { ROLE } from '../../enum';
import { customerAccessRole } from '../../constant';

type Props = {
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
  // handleSearchPopup: (item: product) => void;
};

const WrapperPage = (props: Props) => {
  const user = useSelector(selectUserState);
  const isLoggedInCustomer = customerAccessRole.includes(user.role as ROLE);

  return (
    <div className="w-full h-full relative bg-grey-4">
      <div>
        <Header className={isLoggedInCustomer ? 'header header--grey' : 'header'} isLoggedIn={isLoggedInCustomer} />
        <div className="w-full h-full">{props.children}</div>
        <div className="w-full bottom-0 left-0">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default WrapperPage;
