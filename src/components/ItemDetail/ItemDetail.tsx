import './ItemDetail.scss';
type Props = {
  className?: string;
  name?: string;
  price?: string;
};
const ItemDetail = (props: Props) => {
  return (
    <div className={props.className}>
      <p className="search-detail__name">{props.name || 'Coffee'}</p>
      <p className="search-detail__price">{props.price || '20.000'}</p>
    </div>
  );
};

export default ItemDetail;
