import { CategoryType } from '../CategoryBar/category-bar';
import './category-item.scss';

type Props = {
  item: CategoryType;
};

const CategoryItem: React.FC<Props> = ({ item }) => (
  <div className="wrapper">
    <p className="nameCategory">{item.name}</p>
  </div>
);

export default CategoryItem;