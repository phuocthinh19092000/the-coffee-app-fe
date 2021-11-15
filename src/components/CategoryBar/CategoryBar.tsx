import CategoryData from '../../json/seed_product_types.json';
import './CategoryBar.scss';
import CategoryItem from '../CategoryItem/CategoryItem';

export type CategoryType = {
  id: number;
  name: string;
};

function CategoryBar() {
  const setCategory = (item: CategoryType) => {
    localStorage.setItem('category', JSON.stringify(item.id));
    // console.log(typeof localStorage.getItem('category'));
  };
  return (
    <div>
      {CategoryData.map((item) => (
        <div key={item.id} className="category-item" onClick={() => setCategory(item)}>
          <CategoryItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
