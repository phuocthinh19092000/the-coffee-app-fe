import Exit from '../../share/assets/vector/Exit.svg';
import Summation from '../../share/assets/vector/Summation.svg';
import Subtraction from '../../share/assets/vector/Subtraction.svg';
import VectorSub from '../../share/assets/vector/VectorSub.svg';
import Edit from '../../share/assets/vector/Edit.svg';
import Button from '../Button/Index';
import Card from '../Card/Index';
import Input from '../Input/Input';
import '../DrinkDetail/DrinkItemDetail.scss';
import DrinkItem from '../../features/Product/components/DrinkItem/DrinkItem';
import { useState } from 'react';
import Product from '../../interfaces/product';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../storage';
import { increment, decrement } from '../../features/order/actions/order';
type OrderDetail = {
  drinkId: string;
  quantity: number;
  note?: string;
};

type Props = {
  item: Product;
  handleClickExitPopUp?: React.MouseEventHandler<HTMLImageElement>;
  handleClickPlaceOrder(data: {}): void;
  orderDetail: OrderDetail;
};

function DrinkItemDetail(props: Props) {
  const [note, setNote] = useState(props.orderDetail.note);
  const dispatch = useDispatch();
  const quantity = useSelector((state: RootState) => state.order.orderData.quantity);
  const onSubOneUnit = () => {
    if (quantity === 1) {
      return;
    } else {
      dispatch(decrement());
    }
  };

  const onPlusOneUnit = () => {
    dispatch(increment());
  };

  return (
    <div className="card-item-detail--blur">
      <Card className="card card--center">
        <img src={Exit} className="icon-exit" onClick={props.handleClickExitPopUp} alt="Exit" />

        <DrinkItem item={props.item} />
        <Input
          placeholder="Quanlity: "
          src={quantity === 1 ? Subtraction : VectorSub}
          src2={Summation}
          className="mt-100 mb-24 pointer"
          type="number"
          value={quantity}
          onClickFirstIcon={onSubOneUnit}
          onClickSecondIcon={onPlusOneUnit}
          readOnly={true}
        />
        <Input
          placeholder="Note"
          src={Edit}
          onChange={(e) => {
            setNote(e.target.value);
          }}
          value={note}
        />
        <Button
          className="btn btn-primary btn--enabled mt-100"
          titleButton="PLACE ORDER"
          onClick={() => props.handleClickPlaceOrder({ drinkId: props.item.id, quantity: quantity, note: note })}
        />
      </Card>
    </div>
  );
}

export default DrinkItemDetail;
