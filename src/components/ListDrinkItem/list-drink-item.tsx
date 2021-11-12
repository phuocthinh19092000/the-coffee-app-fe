import DrinkItem from '../DrinkItem/drink-item';
import './list-drink-item.scss';
import { useState } from 'react';
import DrinkItemDetail from '../DrinkDetail/DrinkItemDetail';
import ListProduct from '../../json/seed_products.json'

type DrinkItem = {
  id: number;
  type: string;
  name: string;
  image: string;
  price: number;
};

function ListDrinkItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [itemDrink, setItemDrink] = useState({} as DrinkItem)

  const togglePopup = (item: DrinkItem) => {
    setIsOpen(!isOpen)
    setItemDrink(item)
  };

  return (
    <div className="container">
      {ListProduct &&
        ListProduct.map((item) => (
          <DrinkItem item={item} key={item.id} onClick={() => togglePopup(item)} />
        ))}
      {isOpen && <DrinkItemDetail item={itemDrink} onClick={() => togglePopup(itemDrink)} />}
    </div>
  );
}

export default ListDrinkItem;
