import Exit from '../../share/assets/vector/Exit.svg';
import Summation from '../../share/assets/vector/Summation.svg';
import Subtraction from '../../share/assets/vector/Subtraction.svg';
import VectorSub from '../../share/assets/vector/VectorSub.svg';
import Edit from '../../share/assets/vector/EditIcon.svg';
import Button from '../Button/Index';
import Card from '../Card/Index';
import Input from '../Input/Input';
import './DrinkItemDetail.scss';
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
    dispatch(getNote(e.target.value));
  };

  return (
    <div className="popup-detail--blur">
      <Card className="card card--center popup-detail">
        <img src={Exit} className="popup-detail__exit" onClick={props.handleClickExitPopUp} alt="Exit Icon" />
        <div className="popup-detail__drink-item">
          <DrinkItem item={props.item} />
        </div>

        <div className="popup-detail__input-group">
          <Input
            placeholder="Quanlity: "
            src={order.quantity <= 1 ? Subtraction : VectorSub}
            src2={Summation}
            className="popup-detail__input"
            type="number"
            value={order.quantity}
            onClickFirstIcon={onSubOneUnit}
            onClickSecondIcon={onPlusOneUnit}
            readOnly={true}
          />
          <Input placeholder="Note" src={Edit} onChange={onChangeNote} value={order.note} />
        </div>

        <Button
          className="btn btn-primary btn--enabled popup-detail__button"
          titleButton="PLACE ORDER"
          onClick={() => props.handleClickPlaceOrder()}
        />
      </Card>
    </div>
  );
}

export default DrinkItemDetail;
