import './DrinkItem.scss';
type DrinkItemType = {
  id: number;
  categoryID: number;
  name: string;
  image: string;
  price: number;
};

type Props = {
  item: DrinkItemType;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

function DrinkItem(props: Props) {
  return (
    <div className="drink-item" onClick={props.onClick}>
      <img src={props.item.image} alt={props.item.name} />
      <div>
        <p className="drink-item__name">{props.item.name}</p>
        <p className="drink-item__price">{props.item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
      </div>
    </div>
  );
}

export default DrinkItem;
