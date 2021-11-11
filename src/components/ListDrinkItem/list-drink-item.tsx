import DrinkItem from '../DrinkItem/drink-item';
import './list-drink-item.scss';
import { DrinkData } from '../../Data/seed_products';
export type DrinkItemType = {
  id: number;
  type: string;
  name: string;
  image: string;
  price: number;
};

function ListDrinkItem() {
  return (
    <div className="container">
      {DrinkData &&
        DrinkData.map((item) => (
          <div key={item.id}>
            <DrinkItem item={item} />
          </div>
        ))}
    </div>
  );
}

export default ListDrinkItem;
