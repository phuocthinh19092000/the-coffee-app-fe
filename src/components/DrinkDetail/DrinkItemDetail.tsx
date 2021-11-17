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
import { useState } from 'react';
type DrinkItemType = {
  id: number;
  categoryID: number;
  name: string;
  image: string;
  price: number;
};
type Props = {
  item: DrinkItemType;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
};

function DrinkItemDetail(props: Props) {
  const [quantity, setQuantity] = useState(1);

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
    <Card className="card card--center">
      <a>
        <img src={Exit} className="iconExit" onClick={props.onClick}></img>
      </a>
      <div className="ta-center">
        <DrinkItem item={props.item} />
      </div>
      <Input
        placeholder="Quanlity: "
        src={Subtraction}
        src2={Summation}
        className="margin-bottom mt-100"
        type="number"
        value={quantity}
        onChange={onChangeInputHandler}
        onClickFirstIcon={onPlusOneUnit}
        onClickSecondIcon={onSubOneUnit}
      />
      <Input placeholder="Note" src={Edit} className="margin-bottom" />
      <Button className="btn btn-primary btn--enabled mt-115 " titleButton="PLACE ORDER" />
    </Card>
  );
}

export default DrinkItemDetail;
