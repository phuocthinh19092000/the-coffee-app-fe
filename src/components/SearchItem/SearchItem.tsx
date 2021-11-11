import './SearchItem.scss';
import ItemDetail from '../ItemDetail/ItemDetail';
type Props = {
  src?: string;
  className?: string;
};
const SearchItem = (props: Props) => {
  return (
    <div className={props.className || 'search-item'}>
      <img src={props.src} alt={props.src} />
      <ItemDetail className="search-detail" />
    </div>
  );
};
export default SearchItem;
