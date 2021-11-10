import { DrinkItemType } from '../ListDrinkItem/list-drink-item';
import './drink-item.scss';

type Props = {
  item: DrinkItemType;
};

const DrinkItem: React.FC<Props> = ({ item }) => (
  <div className="wrapper">
    <img src={item.image} alt={item.name} />
    <div>
      <p className="nameDrink">{item.name}</p>
      <p>${item.price}</p>
    </div>
  </div>
);

export default DrinkItem;
