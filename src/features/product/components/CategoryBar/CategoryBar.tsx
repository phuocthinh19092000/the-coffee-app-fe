import './CategoryBar.scss';
import CategoryItem from '../CategoryItem/CategoryItem';
import Category from '../../../../interfaces/category';

type Props = {
  onGetIdHandler(id: number | string): void;
  listCategory: Category[];
  categoryId: string;
};

function CategoryBar(props: Props) {
  return (
    <div>
      {props.listCategory.map((item) => (
        <div
          key={item.id}
          className={item.id === props.categoryId ? 'category-item text-style-1440-h2 active' : 'category-item text-style-1440-h2'}
          onClick={() => props.onGetIdHandler(item.id)}
        >
          <CategoryItem item={item} />
        </div>
      ))}
    </div>
  );
}

export default CategoryBar;
