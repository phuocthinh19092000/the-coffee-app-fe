import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { customerAccessRole } from '../../constant';
import { ROLE } from '../../enum';
import { getFreeUnit, selectUserState, updateFreeUnit } from '../../features/auth/actions/auth';
import PopUpLoginCenter from '../../features/auth/components/PopUpLoginCenter/PopUpLoginCenter';
import { placeOrder, resetOrder, selectOrderState } from '../../features/order/actions/order';
import DrinkItemDetail from '../../features/order/components/DrinkDetail/DrinkItemDetail';
import { getProductsByCategory } from '../../features/product/actions/getProductData';
import { Product } from '../../interfaces';
import { useAppDispatch } from '../../storage/hooks';
import PopUpFinishOrder from '../PopUpFinishOrder/PopUpFinishOrder';
import PopUpRanOutUnit from '../PopUpRanOutUnit/PopUpRanOutUnit';

type Props = {
  categoryId?: string;
  itemDrink: Product;
  setIsOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>;
};

enum showPopupCase {
  showDrinkItemDetail = 1,
  showPopUpRanOutUnit = 2,
  PopUpFinishOrder = 3,
  PopUpLoginCenter = 4,
  PopUpOutOfStock = 5,
}
const OrderProcess = (props: Props) => {
  const [step, setStep] = useState(1);
  const dispatch = useAppDispatch();
  const order = useSelector(selectOrderState);
  const user = useSelector(selectUserState);

  const handleClickBackForm = () => {
    setStep(step - 1);
  };

  const handleClickPlaceOrder = async () => {
    if (!customerAccessRole.includes(user.role as ROLE)) {
      setStep(showPopupCase.PopUpLoginCenter);
      return;
    }
    const freeUnit = await dispatch(getFreeUnit()).unwrap();
    if (typeof freeUnit !== 'number' && freeUnit >= 0) return;
    if (freeUnit < order.quantity) {
      setStep(showPopupCase.showPopUpRanOutUnit);
    } else {
      const response = await dispatch(placeOrder(order));
      if (placeOrder.fulfilled.match(response)) {
        dispatch(resetOrder());
        dispatch(updateFreeUnit(order.quantity));
        setStep(showPopupCase.PopUpFinishOrder);
      } else {
        setStep(showPopupCase.PopUpOutOfStock);
        props.categoryId && dispatch(getProductsByCategory(props.categoryId));
      }
    }
  };

  useEffect(() => {
    if (customerAccessRole.includes(user.role as ROLE)) {
      setStep(showPopupCase.showDrinkItemDetail);
    }
  }, [user.role]);

  const continueOrderRanoutUnit = () => {
    dispatch(placeOrder(order));
    dispatch(updateFreeUnit(order.quantity));
    setStep(showPopupCase.PopUpFinishOrder);
  };

  const exitPopUp = () => {
    dispatch(resetOrder());
    props.setIsOpenPopUp(false);
    setStep(showPopupCase.showDrinkItemDetail);
  };

  const switchStep = () => {
    switch (step) {
      case showPopupCase.showDrinkItemDetail:
        return (
          <DrinkItemDetail
            item={props.itemDrink}
            handleClickExitPopUp={exitPopUp}
            handleClickPlaceOrder={handleClickPlaceOrder}
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
      case showPopupCase.PopUpOutOfStock:
        return (
          <PopUpFinishOrder
            onClick={exitPopUp}
            title="PRODUCT OUT OF STOCK"
            description="Sorry! Please choose other drink, this product is out of stock!"
          />
        );
      default:
        break;
    }
  };
  return <>{switchStep()}</>;
};
export default OrderProcess;
