import dayjs from 'dayjs';
import './OrderItem.scss';
import EditIcon from '../../../../share/assets/img/edit.png';
import Order from '../../../../interfaces/order';
import CoffeeImg from '../../../../share/assets/img/CoffeeImg.png'
type Props = {
  item: Order;
}
const OrderItem = (props: Props) => {
  const date = dayjs(props.item.createdAt).format("MMMM DD, YYYY")
  return (
    <div className="order-item">
      <p className="order-item__date">{date}</p>

      <div className="order-item__contain">
        <div className="order-item__contain-left">
          <img src={CoffeeImg} alt="Drink" />
        </div>
        <div className="order-item__contain-center">
          <p className="order-item__name">{props.item.productId.name}</p>
          <p className="order-item__desc">{props.item.productId.price}đ - Qty: {props.item.quantity} - {props.item.orderStatus}</p>
          <p className="order-item__note">Note: {props.item.note}</p>
        </div>
        <div className="order-item__contain-right">
          {/*<div className="order-item__contain-icon">*/}
          {/*<img src={EditIcon} alt="Edit Icon" className="edit-icon" />*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
