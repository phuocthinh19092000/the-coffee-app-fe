import { CategoriesData } from '../../Data/seed_product_types';
import './category-bar.scss';
import CategoryItem from '../CategoryItem/category-item';

export type CategoryType = {
  id: number;
  name: string;
};

function CategoryBar() {
  return (
    <div className="container">
      {CategoriesData &&
        CategoriesData.map((item) => (
          <div key={item.id} className="item">
            <CategoryItem item={item} />
          </div>
        ))}
    </div>
  );
}

export default CategoryBar;
