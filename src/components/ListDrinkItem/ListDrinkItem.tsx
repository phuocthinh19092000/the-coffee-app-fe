import DrinkItem from '../DrinkItem/DrinkItem';
import './ListDrinkItem.scss';
import { useState } from 'react';
import DrinkItemDetail from '../DrinkDetail/DrinkItemDetail';
import PopUpFinishOrder from '../PopUpFinishOrder/PopUpFinishOrder';
import PopUpRanOutUnit from '../PopUpRanOutUnit/PopUpRanOutUnit';
import PopUpLoginCenter from '../PopUpLoginCenter/PopUpLoginCenter';
type DrinkItem = {
  id: number;
  categoryID: number;
  name: string;
  image: string;
  price: number;
};
type Props = {
  listDrink: DrinkItem[];
};

type OrderDetail = {
  drinkId: number;
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
  const [itemDrink, setItemDrink] = useState({} as DrinkItem);
  const togglePopup = (item: DrinkItem) => {
    setIsOpenPopUp(!isOpenPopUp);
    setItemDrink(item);
  };
  const [step, setStep] = useState(1);
  const [orderDetail, setOrderDetail] = useState({ drinkId: itemDrink.id, quantity: 1, note: '' } as OrderDetail);

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
    setOrderDetail({ drinkId: itemDrink.id, quantity: 1, note: '' } as OrderDetail);
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
        <DrinkItem item={item} key={item.id} onClick={() => togglePopup(item)} />
      ))}
      {isOpenPopUp && switchStep()}
    </div>
  );
}

export default ListDrinkItem;
