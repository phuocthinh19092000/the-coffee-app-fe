import DrinkItem from '../DrinkItem/DrinkItem';
import './ListDrinkItem.scss';

import { useState } from 'react';
import DrinkItemDetail from '../../../../components/DrinkDetail/DrinkItemDetail';
import PopUpFinishOrder from '../../../../components/PopUpFinishOrder/PopUpFinishOrder';
import PopUpRanOutUnit from '../../../../components/PopUpRanOutUnit/PopUpRanOutUnit';
import PopUpLoginCenter from '../../../../components/PopUpLoginCenter/PopUpLoginCenter';
import Category from '../../../../interfaces/product';
import Product from '../../../../interfaces/product';

type Props = {
  listDrink: Product[];
  searchDrink?: Product[];
};

type OrderDetail = {
  drinkId: string;
  quantity: number;
  note: string | undefined;
};

enum showPopupCase {
  showDrinkItemDetail = 1,
  showPopUpRanOutUnit = 2,
  PopUpFinishOrder = 3,
  PopUpLoginCenter = 4,
}

function ListDrinkItem(props: Props) {
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);

  const [itemDrink, setItemDrink] = useState({} as Category);
  const togglePopup = (item: Category) => {
    setIsOpenPopUp(!isOpenPopUp);
    setItemDrink(item);
    setIsOpenPopUp(!isOpenPopUp);
  };

  const [step, setStep] = useState(1);
  const [orderDetail, setOrderDetail] = useState({ drinkId: itemDrink._id, quantity: 1, note: '' } as OrderDetail);

  // useEffect(() => {
  //   if (Object.keys(props.searchDrink).length !== 0) {
  //     setOrderDetail({ drinkId: itemDrink._id, quantity: 1, note: '' } as OrderDetail);
  //     setIsOpenPopUp(true);
  //   }
  // }, [props.searchDrink]);
  const handleClickBackForm = () => {
    setStep(step - 1);
  };

  const handleClickPlaceOrder = (orderDetail: OrderDetail) => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    if (!user) {
      setStep(showPopupCase.PopUpLoginCenter);
      return;
    }
    setOrderDetail(orderDetail);
    if (user.freeunit < orderDetail.quantity) {
      setStep(showPopupCase.showPopUpRanOutUnit);
    } else {
      user.freeunit -= orderDetail.quantity;
      document.dispatchEvent(new CustomEvent('setFreeUnit', { detail: user.freeunit }));
      localStorage.setItem('user', JSON.stringify(user));
      setStep(showPopupCase.PopUpFinishOrder);
    }
  };

  const exitPopUp = () => {
    setIsOpenPopUp(false);
    setStep(showPopupCase.showDrinkItemDetail);
    setOrderDetail({ drinkId: itemDrink._id, quantity: 1, note: '' } as OrderDetail);
  };

  const continueOrderRanoutUnit = () => {
    const userJson = localStorage.getItem('user');
    const user = userJson && JSON.parse(userJson);
    user.freeunit = 0;
    document.dispatchEvent(new CustomEvent('setFreeUnit', { detail: user.freeunit }));
    localStorage.setItem('user', JSON.stringify(user));
    setStep(showPopupCase.PopUpFinishOrder);
  };

  const switchStep = () => {
    switch (step) {
      case showPopupCase.showDrinkItemDetail:
        return (
          <DrinkItemDetail
            item={itemDrink}
            handleClickExitPopUp={exitPopUp}
            handleClickPlaceOrder={handleClickPlaceOrder}
            orderDetail={orderDetail}
          />
        );
      case showPopupCase.showPopUpRanOutUnit:
        return (
          <PopUpRanOutUnit
            onClickContinueProceed={continueOrderRanoutUnit}
            handleClickBackForm={handleClickBackForm}
            onClickExit={exitPopUp}
          />
        );
      case showPopupCase.PopUpFinishOrder:
        return <PopUpFinishOrder onClick={exitPopUp} />;
      case showPopupCase.PopUpLoginCenter:
        return <PopUpLoginCenter onClick={exitPopUp} />;
      default:
        break;
    }
  };

  return (
    <div className="menu-drink">
      {props.listDrink.map((item) => (
        <DrinkItem item={item} key={item._id} onClick={() => togglePopup(item)} />
      ))}

      {isOpenPopUp && switchStep()}
    </div>
  );
}

export default ListDrinkItem;
