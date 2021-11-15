import './DrinkItem.scss';
type DrinkItemType = {
  id: number;
  type: string;
  name: string;
  image: string;
  price: number;
};

type Props = {
  item: DrinkItemType;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const DrinkItem: React.FC<Props> = ({ item, onClick }) => (
  <div className="wrapper-drink-item" onClick={onClick}>
    <img src={item.image} alt={item.name} />
    <div>
      <p className="name-drink">{item.name}</p>
      <p className="price-drink">{item.price}</p>
    </div>
  </div>
);

export default DrinkItem;