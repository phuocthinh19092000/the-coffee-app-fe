import CategoryData from '../../json/seed_product_types.json';
import './CategoryBar.scss';
import CategoryItem from '../CategoryItem/CategoryItem';
import React from 'react';

export type CategoryType = {
  id: number;
  name: string;
};
type Props = {
  onGetIdHandler(id: number): void;
};

function CategoryBar(props: Props) {
  return (
    <div>
      {CategoryData.map((item) => (
        <div key={item.id} className="category-item" onClick={() => props.onGetIdHandler(item.id)}>
          <CategoryItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
