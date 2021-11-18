import './DrinkItem.scss';
import { moneyPattern } from '../../utils/regex';
type DrinkItemType = {
  id: number;
  categoryID: number;
  name: string;
  image: string;
  price: number;
};

type Props = {
  item: DrinkItemType;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function DrinkItem(props: Props) {
  const moneyFormat = (price: number) => {
    return price.toString().replace(moneyPattern, ',');
  };
  return (
    <div className="drink-item" onClick={props.onClick}>
      <img src={props.item.image} alt={props.item.name} />
      <div>
        <p className="drink-item__name">{props.item.name}</p>
        <p className="drink-item__price">{moneyFormat(props.item.price)}</p>
      </div>
    </div>
  );
}

export default DrinkItem;
