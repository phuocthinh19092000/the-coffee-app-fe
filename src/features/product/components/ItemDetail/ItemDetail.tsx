import './ItemDetail.scss';
import { moneyPattern } from '../../../../utils/regex';

type Props = {
  className?: string;
  name?: string;
  price?: string;
};
const ItemDetail = (props: Props) => {
  const moneyFormat = (price: number) => {
    return price.toString().replace(moneyPattern, ',');
  };
  return (
    <div className={props.className}>
      <p className="search-detail__name">{props.name}</p>
      <p className="search-detail__price">{moneyFormat(Number(props.price))}đ</p>
    </div>
  );
};

export default ItemDetail;