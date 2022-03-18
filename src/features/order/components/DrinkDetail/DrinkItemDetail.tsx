import Exit from '../../../../share/assets/vector/Exit.svg';
import Summation from '../../../../share/assets/vector/Summation.svg';
import Subtraction from '../../../../share/assets/vector/Subtraction.svg';
import VectorSub from '../../../../share/assets/vector/VectorSub.svg';
import Edit from '../../../../share/assets/vector/EditIcon.svg';
import Button from '../../../../components/Button/Index';
import Card from '../../../../components/Card/Index';
import Input from '../../../../components/Input/Input';
import './DrinkItemDetail.css';
import DrinkItem from '../../../product/components/DrinkItem/DrinkItem';
import { Product } from '../../../../interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { getNote, getQuantity, selectOrderState } from '../../actions/order';
import React from 'react';

type Props = {
  item: Product;
  handleClickExitPopUp?: React.MouseEventHandler<HTMLImageElement>;
  handleClickPlaceOrder(): void;
};

function DrinkItemDetail(props: Props) {
  const dispatch = useDispatch();
  const order = useSelector(selectOrderState);
  const onSubOneUnit = () => {
    if (order.quantity > 1) {
      dispatch(getQuantity(-1));
    }
  };

  const onPlusOneUnit = () => {
    dispatch(getQuantity(1));
  };

  const onChangeNote: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(getNote(e.target.value));
  };

  return (
    <Card className="card card--center popup-detail">
      <img src={Exit} className="popup-detail__exit" onClick={props.handleClickExitPopUp} alt="Exit Icon" />
      <div className="popup-detail__drink-item">
        <DrinkItem item={props.item} />
      </div>

      <div className="popup-detail__input-group">
        <Input
          src={order.quantity <= 1 ? Subtraction : VectorSub}
          src2={Summation}
          className="popup-detail__input"
          type="number"
          value={order.quantity}
          onClickFirstIcon={onSubOneUnit}
          onClickSecondIcon={onPlusOneUnit}
          readOnly={true}
        />
        <Input placeholder="Note" src2={Edit} onChange={onChangeNote} value={order.note} />
      </div>

      <Button
        className="btn btn-primary btn--enabled popup-detail__button text-style-1440-button"
        titleButton="PLACE ORDER"
        onClick={() => props.handleClickPlaceOrder()}
      />
    </Card>
  );
}

export default DrinkItemDetail;
