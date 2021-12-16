import './SearchItem.scss';
import ItemDetail from '../../features/Product/components/ItemDetail/ItemDetail';
type Props = {
  avatarUrl?: string;
  className?: string;
  name?: string;
  price?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const SearchItem = (props: Props) => {
  return (
    <div className={props.className || 'search-item'} onClick={props.onClick}>
      <img className="search-item__img" src={props.avatarUrl} alt={props.avatarUrl} />
      <ItemDetail className="search-detail" name={props.name} price={props.price} />
    </div>
  );
};
export default SearchItem;
