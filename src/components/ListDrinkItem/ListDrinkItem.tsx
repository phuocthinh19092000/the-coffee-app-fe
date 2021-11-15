import DrinkItem from '../DrinkItem/DrinkItem';
import './ListDrinkItem.scss';
import { useState, useRef, useEffect } from 'react';
import DrinkItemDetail from '../DrinkDetail/DrinkItemDetail';
import DrinkData from '../../json/seed_products.json';

type DrinkItem = {
  id: number;
  categoryID: number;
  name: string;
  image: string;
  price: number;
};

function ListDrinkItem() {
  const [isOpen, setIsOpen] = useState(false);
  const [itemDrink, setItemDrink] = useState({} as DrinkItem);
  const togglePopup = (item: DrinkItem) => {
    setIsOpen(!isOpen);
    setItemDrink(item);
  };

  let categoryType = localStorage.getItem('category');
  console.log(categoryType);
  const drinkType = categoryType ? JSON.parse(categoryType) : 1;
  console.log(drinkType);
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
    <div className="view-list-drink-item" ref={popUpDrinkItemRef}>
      {DrinkData.filter((type) => type.categoryID === drinkType).map((item) => (
        <DrinkItem item={item} key={item.id} onClick={() => togglePopup(item)} />
      ))}
      {isOpen && <DrinkItemDetail item={itemDrink} onClick={() => togglePopup(itemDrink)} />}
    </div>
  );
}

export default ListDrinkItem;
