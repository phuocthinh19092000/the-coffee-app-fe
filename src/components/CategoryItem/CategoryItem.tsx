import { CategoryType } from '../CategoryBar/CategoryBar';
import './CategoryItem.scss';

type Props = {
  item: CategoryType;
};

const CategoryItem: React.FC<Props> = ({ item }) => (
  <div className="wrapper-category">
    <p className="name-category">{item.name}</p>
  </div>
);

export default CategoryItem;
