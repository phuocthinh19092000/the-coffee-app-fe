import { CategoryType } from '../CategoryBar/CategoryBar';
import './CategoryItem.scss';

type Props = {
  item: CategoryType;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const CategoryItem: React.FC<Props> = ({ item, onClick }) => (
  <div className="wrapper-category" onClick={onClick}>
    <p className="name-category">{item.name}</p>
  </div>
);

export default CategoryItem;
