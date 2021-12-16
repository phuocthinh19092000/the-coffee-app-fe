import './CategoryBar.scss';
import CategoryItem from '../CategoryItem/CategoryItem';
import Category from '../../../../interfaces/category';

type Props = {
  onGetIdHandler(id: number | string): void;
  selectedCategoryId: string | number | undefined;
  listCategory: Category[];
};

function CategoryBar(props: Props) {
  return (
    <div>
      {props.listCategory.map((item) => (
        <div
          key={item._id}
          className={item._id === props.selectedCategoryId ? 'category-item active' : 'category-item'}
          onClick={() => props.onGetIdHandler(item._id)}
        >
          <CategoryItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
