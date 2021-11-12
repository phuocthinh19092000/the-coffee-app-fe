import './SearchItem.scss';
import ItemDetail from '../ItemDetail/ItemDetail';
type Props = {
  src?: string;
  className?: string;
  name?: string;
  price?: string
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};
const SearchItem = (props: Props) => {
  return (
    <div className={props.className || 'search-item'} onClick = {props.onClick}>
      <img src={props.src} alt={props.src} />
      <ItemDetail className="search-detail" name = {props.name} price = {props.price}/>
    </div>
  );
};
export default SearchItem;
