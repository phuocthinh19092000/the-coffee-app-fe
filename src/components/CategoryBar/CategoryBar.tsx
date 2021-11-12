import CategoryData from '../../json/seed_product_types.json';
import './CategoryBar.scss';
import CategoryItem from '../CategoryItem/CategoryItem';

export type CategoryType = {
  id: number;
  name: string;
};
const getCategoryItem = (categoryData: CategoryType[]) => {
  return categoryData.map((item) => (
    <div key={item.id} className="item">
      <CategoryItem item={item} />
    </div>
  ));
};
function CategoryBar() {
  return <div>{CategoryData && getCategoryItem(CategoryData as CategoryType[])}</div>;
}

export default CategoryBar;
