import { useState, useEffect } from 'react';
import DrinkItem from '../DrinkItem/drink-item';
import axios from 'axios';
import './list-drink-item.scss';

export type DrinkItemType = {
  id: number;
  category: string;
  name: string;
  image: string;
  price: number;
};

function ListDrinkItem() {
  const [itemData, setItemData] = useState([] as DrinkItemType[]);
  useEffect(() => {
    axios
      .get('./seed_products.json')
      .then((res) => setItemData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      {itemData &&
        itemData.map((item) => (
          <div key={item.id}>
            <DrinkItem item={item} />
          </div>
        ))}
    </div>
  );
}

export default ListDrinkItem;
