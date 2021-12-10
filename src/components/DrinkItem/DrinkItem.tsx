import './DrinkItem.scss';
import { moneyPattern } from '../../utils/regex';
type DrinkItemType = {
  id: number;
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
      <div className="drink-item__image">
        <img src={props.item.image} alt={props.item.name} />
      </div>
      <div>
        <div>
          <span className="drink-item__name">
            {props.item.name}
            <br />
            <br />
          </span>
        </div>
        <div>
          <span className="drink-item__price">{moneyFormat(props.item.price)}đ</span>
        </div>
      </div>
    </div>
  );
}

export default DrinkItem;
