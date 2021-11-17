import { CategoryType } from '../CategoryBar/CategoryBar';

type Props = {
  item: CategoryType;
};

function CategoryItem(props: Props) {
  return (
    <div>
      <p>{props.item.name}</p>
    </div>
  );
}

export default CategoryItem;
