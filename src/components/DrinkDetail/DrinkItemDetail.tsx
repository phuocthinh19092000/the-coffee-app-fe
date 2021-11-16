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
  return (
    <Card className="card center shadow border background-color">
      <a>
        <img src={Exit} className="iconExit" onClick={props.onClick}></img>
      </a>
      <div className="ta-center">
        <DrinkItem item={props.item} />
      </div>
      <Input placeholder="Quanlity: " src={Subtraction} src2={Summation} className="margin-bottom mt-100" />
      <Input placeholder="Note" src={Edit} className="margin-bottom" />
      <Button className="primary enabled mt-115 " titleButton="PLACE ORDER" />
    </Card>
  );
}

export default DrinkItemDetail;
