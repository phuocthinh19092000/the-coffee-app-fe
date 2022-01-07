import dayjs from 'dayjs';
import './OrderItem.scss';
import EditIcon from '../../../../share/assets/img/edit.png';
import SuccessIcon from '../../../../share/assets/vector/SuccessIcon.svg';
import Order from '../../../../interfaces/order';
import CoffeeImg from '../../../../share/assets/img/CoffeeImg.png';
import { moneyFormat } from '../../../../utils/MoneyFormat'
import { camelCase, startCase } from 'lodash';
import { datePattern } from '../../../../utils/dateRegex';

type Props = {
  item: Order;
}
enum OrderStatus {
  new = 'new',
  processing = 'processing',
  readyForPickUp = 'ready for pickup',
  pickedUp = 'picked up',
  canceled = 'canceled',
}
const OrderItem = (props: Props) => {
  const date = dayjs(props.item.createdAt).format(datePattern)
  const status = startCase(camelCase(props.item.orderStatus.name))
  let icon = '';
  if(props.item.orderStatus.name === OrderStatus.new) {
    icon = EditIcon;
  } else if(props.item.orderStatus.name === OrderStatus.readyForPickUp) {
    icon = SuccessIcon;
  }
  return (
    <div className="order-item">
      <p className="order-item__date">{date}</p>

      <div className="order-item__contain">
        <div className="order-item__contain-left">
          <img src={CoffeeImg} alt="Drink" />
        </div>
        <div className="order-item__contain-center">
          <p className="order-item__name">{props.item.product.name}</p>
          <p className="order-item__desc">{moneyFormat(Number(props.item.product.price))}đ - Qty: {props.item.quantity} - {status}</p>
          <p className="order-item__note">Note: {props.item.note}</p>
        </div>
        <div className="order-item__contain-right">
          {icon ? (
            <div className="order-item__contain-icon">
              <img src={icon} alt={icon} className="edit-icon" />
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
