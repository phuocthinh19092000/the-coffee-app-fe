import Exit from '../../share/assets/vector/Exit.svg';
import Summation from '../../share/assets/vector/Summation.svg';
import Subtraction from '../../share/assets/vector/Subtraction.svg';
import Edit from '../../share/assets/vector/Edit.svg';
import Button from '../Button/Index';
import Card from '../Card/Index';
import Input from '../Input/Input';
import '../DrinkDetail/DrinkItemDetail.scss';
import DrinkItem from '../DrinkItem/DrinkItem';
import DrinkItemType from '../ListDrinkItem/ListDrinkItem';
import { useState, useEffect, useRef } from 'react';

type DrinkItemType = {
  id: number;
  categoryID: number;
  name: string;
  image: string;
  price: number;
};

type Props = {
  item: DrinkItemType;
  handleClickExitPopUp?: React.MouseEventHandler<HTMLImageElement>;

  handleClickPlaceOrder(data: {}): void;
};

function DrinkItemDetail(props: Props) {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  const onSubOneUnit = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const onPlusOneUnit = () => {
    setQuantity(quantity + 1);
  };

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(event.target.valueAsNumber);
  };

  return (
    <div className="card-item-detail--blur">
      <Card className="card card--center">
        <a>
          <img src={Exit} className="icon-exit" onClick={props.handleClickExitPopUp}></img>
        </a>
        <DrinkItem item={props.item} />
        <Input
          placeholder="Quanlity: "
          src={Subtraction}
          src2={Summation}
          className="mt-100 mb-24"
          type="number"
          value={quantity}
          onChange={onChangeInputHandler}
          onClickFirstIcon={onSubOneUnit}
          onClickSecondIcon={onPlusOneUnit}
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
