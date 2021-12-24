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
import Product from '../../interfaces/product';
import { useDispatch, useSelector } from 'react-redux';
import { getQuantity, getNote, selectOrderState } from '../../features/order/actions/order';

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
    dispatch(getNote(e.target.value))
  }

  return (
    <div className="card-item-detail--blur">
      <Card className="card card--center">
        <img src={Exit} className="icon-exit" onClick={props.handleClickExitPopUp} alt="Exit" />

        <DrinkItem item={props.item} />
        <Input
          placeholder="Quanlity: "
          src={order.quantity <= 1 ? Subtraction : VectorSub}
          src2={Summation}
          className="mt-100 mb-24 pointer"
          type="number"
          value={order.quantity}
          onClickFirstIcon={onSubOneUnit}
          onClickSecondIcon={onPlusOneUnit}
          readOnly={true}
        />
        <Input
          placeholder="Note"
          src={Edit}
          onChange={onChangeNote}
          value={order.note}
        />
        <Button
          className="btn btn-primary btn--enabled mt-100"
          titleButton="PLACE ORDER"
          onClick={() => props.handleClickPlaceOrder()}
        />
      </Card>
    </div>
  );
}

export default DrinkItemDetail;
