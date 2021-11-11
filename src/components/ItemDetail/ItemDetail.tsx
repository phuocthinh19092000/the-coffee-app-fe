import './ItemDetail.scss';
type Props = {
  className?: string;
  name?: string;
  price?: string;
};
const ItemDetail = (props: Props) => {
  return (
    <div className={props.className}>
      <p className="item-name">{props.name || 'Coffee'}</p>
      <p className="item-price">{props.price || '20.000'}</p>
    </div>
  );
};

export default ItemDetail;
