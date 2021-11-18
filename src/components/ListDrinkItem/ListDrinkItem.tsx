import DrinkItem from '../DrinkItem/DrinkItem';
import './ListDrinkItem.scss';
import { useState } from 'react';
import DrinkItemDetail from '../DrinkDetail/DrinkItemDetail';
type DrinkItem = {
  id: number;
  categoryID: number;
  name: string;
  image: string;
  price: number;
};
type Props = {
  listDrink: DrinkItem[];
};

function ListDrinkItem(props: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemDrink, setItemDrink] = useState({} as DrinkItem);
  const togglePopup = (item: DrinkItem) => {
    setIsOpen(!isOpen);

    setItemDrink(item);
  };

  return (
    <div className="menu-drink">
      {props.listDrink.map((item) => (
        <DrinkItem item={item} key={item.id} onClick={() => togglePopup(item)} />
      ))}

      {isOpen && (<DrinkItemDetail item={itemDrink} onClick={() => togglePopup(itemDrink)} />)}
    </div>
  );
}

export default ListDrinkItem;
