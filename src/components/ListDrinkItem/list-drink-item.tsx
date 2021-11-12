import DrinkItem from '../DrinkItem/drink-item';
import './list-drink-item.scss';
import { useState, useRef, useEffect } from 'react';
import DrinkItemDetail from '../DrinkDetail/DrinkItemDetail';
import ListProduct from '../../json/seed_products.json';

type DrinkItem = {
  id: number;
  type: string;
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
    <div className="container" ref={popUpDrinkItemRef}>
      {ListProduct.map((item) => (
        <DrinkItem item={item} key={item.id} onClick={() => togglePopup(item)} />
      ))}
      {isOpen && <DrinkItemDetail item={itemDrink} onClick={() => togglePopup(itemDrink)} />}
    </div>
  );
}

export default ListDrinkItem;
