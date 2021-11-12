import './drink-item.scss';
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
  <div className="wrapper" onClick={onClick}>
    <img src={item.image} alt={item.name} />
    <div>
      <p className="nameDrink">{item.name}</p>
      <p>{item.price}</p>
    </div>
  </div>
);

export default DrinkItem;
