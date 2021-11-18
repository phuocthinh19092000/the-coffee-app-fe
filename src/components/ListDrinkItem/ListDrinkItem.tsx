import DrinkItem from '../DrinkItem/DrinkItem';
import './ListDrinkItem.scss';
import { useState, useRef, useEffect } from 'react';
import DrinkItemDetail from '../DrinkDetail/DrinkItemDetail';
// Import to use PopUpFinishOrder component
// import PopUpFinishOrder from '../PopUpFinishOrder/PopUpFinishOrder';
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

  const popUpDrinkItemRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (popUpDrinkItemRef.current && !popUpDrinkItemRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen]);

  return (
    <div className="view-list-drink-item">
      {props.listDrink.map((item) => (
        <DrinkItem item={item} key={item.id} onClick={() => togglePopup(item)} />
      ))}
      {isOpen && <DrinkItemDetail item={itemDrink} onClick={() => togglePopup(itemDrink)} />}

      {/* Click Drink Item to show Popup Finish Order */}
      {/* {isOpen && <PopUpFinishOrder onClick={() => togglePopup(itemDrink)} />} */}
    </div>
  );
}

export default ListDrinkItem;
