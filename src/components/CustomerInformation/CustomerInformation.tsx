import React, { useMemo, useState } from 'react';
import UserInformation from '../../share/assets/vector/UserInformation.svg';
import ExpandMore from '../../share/assets/vector/ExpandMore.svg';
import './CustomerInformation.scss';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../features/auth/actions/auth';
import PopUpChangeWebhook from '../../features/auth/components/PopUpChangeWebhook/PopUpChangeWebhook';
import useComponentVisible from '../../utils/useComponentVisible';
import MyOrder from '../../features/my-order/page/MyOrder/MyOrder';
import PopUpChangePassword from '../../features/auth/components/PopUpChangePassword/PopUpChangePassword';
import PopUpLogOut from '../../features/auth/components/PopUpLogOut/PopUpLogOut';
import useClearNotification from '../../utils/useClearNotification';
import ToastNotification from '../ToastNotification/ToatstNotification';

type PopUpObjectType = {
  [key: string]: JSX.Element;
};

const CustomerInformation = () => {
  const { name, freeUnit } = useSelector(selectUserState);
  const [dropdownMenuRef, isMenuOpen, setIsMenuOpen] = useComponentVisible(false);
  const [popUpRef, isPopUpOpen, setIsPopUpOpen] = useComponentVisible(false);
  const [popUpCase, setShowPopUpCase] = useState<string>('');

  const [typeShowNotification, setTypeShowNotification] = useClearNotification();

  const handleClickInside = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const onClickClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  const handleClickChangeWebHook = () => {
    // TODO: Handle click change web hook in here
    // after dispatch successfuly ,  setIsPopUpOpen(false);
  };

  const showPopUpCase: PopUpObjectType = useMemo(() => {
    return {
      MY_ORDERS: <MyOrder />,
      CHANGE_WEBHOOK: <PopUpChangeWebhook onClickChangeWebhook={handleClickChangeWebHook} />,
      CHANGE_PASSWORD: (
        <PopUpChangePassword setShowNotification={setTypeShowNotification} onClickClosePopUp={onClickClosePopUp} />
      ),
      LOG_OUT: <PopUpLogOut onClick={onClickClosePopUp} />,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setShowPopUp = (popUp: string) => {
    setShowPopUpCase(popUp);
    setIsPopUpOpen(true);
  };

  const switchPopUp = () => {
    return showPopUpCase[popUpCase];
  };

  return (
    <>
      <div ref={dropdownMenuRef} className="block-customer-information" onClick={handleClickInside}>
        <img className="block-customer-information__img" src={UserInformation} alt="Customer Information" />
        <span className="block-customer-information__span">{name}</span>
        <div className="menu-dropdown">
          <img src={ExpandMore} className="menu-dropdown__img" alt="expand more" />
          {isMenuOpen && (
            <div className="menu-dropdown__content">
              <span className="menu-dropdown__item">
                Today Free Unit: <span className="menu-dropdown__item--accent">{freeUnit}</span>
              </span>
              <span className="menu-dropdown__item" onClick={() => setShowPopUp('MY_ORDERS')}>
                My Orders
              </span>
              {/* //TODO: Add component change avatar  */}
              {/* <span className="menu-dropdown__item" onClick={() => setShowPopUp('CHANGE_AVATAR')}>
                Change Avatar
              </span> */}
              <span className="menu-dropdown__item" onClick={() => setShowPopUp('CHANGE_WEBHOOK')}>
                Change Webhook
              </span>
              <span className="menu-dropdown__item" onClick={() => setShowPopUp('CHANGE_PASSWORD')}>
                Change Password
              </span>
              <span className="menu-dropdown__item menu-dropdown__item--accent" onClick={() => setShowPopUp('LOG_OUT')}>
                Log out
              </span>
            </div>
          )}
        </div>
      </div>

      {isPopUpOpen && (
        <div ref={popUpRef} className="background-blur">
          {switchPopUp()}
        </div>
      )}

      {typeShowNotification.message && (
        <ToastNotification
          type={typeShowNotification.type}
          message={typeShowNotification.message}
          position={typeShowNotification.position}
        />
      )}
    </>
  );
};

export default CustomerInformation;
