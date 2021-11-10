import { useState, useEffect } from 'react';
import axios from 'axios';
import '../LeftSideBar/left-side-bar.scss';
import CategoryItem from '../CategoryItem/category-item';

// type Props = {
//   titleItem: string;
// };
// const LeftSideBar = (props: Props) => {
//   return <button className="item margin-top">{props.titleItem}</button>;
// };

export type CategoryType = {
  name: string;
};

function LeftSideBar() {
  const [itemData, setItemData] = useState([] as CategoryType[]);
  useEffect(() => {
    axios
      .get('./seed_product_types.json')
      .then((res) => setItemData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      {itemData &&
        itemData.map((item, index) => (
          <div key={index} className="item">
            <CategoryItem item={item} />
          </div>
        ))}
    </div>
  );
}

export default LeftSideBar;
