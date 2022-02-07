import DrinkItem from '../DrinkItem/DrinkItem';
import './ListDrinkItem.scss';
import { useEffect, useState } from 'react';
import DrinkItemDetail from '../../../order/components/DrinkDetail/DrinkItemDetail';
import PopUpFinishOrder from '../../../../components/PopUpFinishOrder/PopUpFinishOrder';
import PopUpRanOutUnit from '../../../../components/PopUpRanOutUnit/PopUpRanOutUnit';
import PopUpLoginCenter from '../../../auth/components/PopUpLoginCenter/PopUpLoginCenter';
import Product from '../../../../interfaces/product';
import { useSelector } from 'react-redux';
import { getProductId, placeOrder, resetOrder, selectOrderState } from '../../../order/actions/order';
import { selectSearchState } from '../../../search/action/getSearchItemData';
import { useAppDispatch } from '../../../../storage/hooks';
import { getFreeUnit, selectUserState, updateFreeUnit } from '../../../auth/actions/auth';
import { ROLE } from '../../../../enum';
type Props = {
  listDrink: Product[];
  searchDrink?: Product[];
};

enum showPopupCase {
  showDrinkItemDetail = 1,
  showPopUpRanOutUnit = 2,
  PopUpFinishOrder = 3,
  PopUpLoginCenter = 4,
}

function ListDrinkItem(props: Props) {
  const [step, setStep] = useState(1);
  const [isOpenPopUp, setIsOpenPopUp] = useState(false);
  const [itemDrink, setItemDrink] = useState({} as Product);
  const dispatch = useAppDispatch();
  const order = useSelector(selectOrderState);
  const user = useSelector(selectUserState);
  const listProductItemsSearch = useSelector(selectSearchState);
  const togglePopup = (item: Product) => {
    setItemDrink(item);
    setIsOpenPopUp(!isOpenPopUp);
    dispatch(getProductId(item.id));
  };

  const handleClickBackForm = () => {
    setStep(step - 1);
  };

  const handleClickPlaceOrder = async () => {
    if (user.role !== ROLE.CUSTOMER) {
      setStep(showPopupCase.PopUpLoginCenter);
      return;
    }
    const freeUnit = await dispatch(getFreeUnit()).unwrap();
    if (typeof freeUnit !== 'number' && freeUnit >= 0) return;
    if (freeUnit < order.quantity) {
      setStep(showPopupCase.showPopUpRanOutUnit);
    } else {
      dispatch(placeOrder(order));
      dispatch(updateFreeUnit(order.quantity));
      setStep(showPopupCase.PopUpFinishOrder);
    }
  };

  useEffect(() => {
    if (user.role === ROLE.CUSTOMER) {
      setStep(showPopupCase.showDrinkItemDetail);
    }
  }, [user.role]);

  useEffect(() => {
    if (order.productId) {
      const itemSearchClicked = listProductItemsSearch.find((product) => product.id === order.productId);
      if (itemSearchClicked) {
        setItemDrink(itemSearchClicked);
        setIsOpenPopUp(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.productId]);

  const exitPopUp = () => {
    dispatch(resetOrder());
    setIsOpenPopUp(false);
    setStep(showPopupCase.showDrinkItemDetail);
  };

  const continueOrderRanoutUnit = () => {
    dispatch(placeOrder(order));
    dispatch(updateFreeUnit(order.quantity));
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
