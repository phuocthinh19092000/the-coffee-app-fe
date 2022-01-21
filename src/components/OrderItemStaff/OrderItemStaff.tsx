import Order from '../../interfaces/order';
import './OrderItemStaff.scss';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import { moneyFormat } from '../../utils/MoneyFormat';
import ADuyMai from '../../share/assets/img/aDuyMai.jpg';
import nextIcon from '../../share/assets/vector/nextIcon.svg';
import iconPickedUp from '../../share/assets/vector/iconpickedUp.svg';
import alarmIcon from '../../share/assets/vector/AlarmIcon.svg';
import { OrderStatus } from '../../enum';

interface Props {
  order: Order;
  onClickChangeStatus?: React.MouseEventHandler<HTMLElement>;
  onClickSendNotification?: React.MouseEventHandler<HTMLElement>;
}

const OrderItemStaff = (props: Props) => {
  let icon = props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP ? iconPickedUp : nextIcon;

  return (
    <div className="order-item-staff">
      <img src={CoffeeImg} className="order-item-staff__img" alt={CoffeeImg} />

      {/* TODO:  get image from API<img src={props.order.product.images} className='order-item__img' alt={props.order.product.images} /> */}
      <div className="order-detail-staff">
        <b className="order-detail-staff__product">{props.order.product.name}</b>
        <p className="order-detail-staff__price">
          {moneyFormat(Number(props.order.product.price))}đ - Qty: {props.order.quantity}
        </p>
        {props.order.note ? <p className="order-detail-staff__note">Note: {props.order.note}</p> : ''}
      </div>
      <div className="order-item-staff__alarm">
        {props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP && (
          <button onClick={props.onClickSendNotification}>
            <img src={alarmIcon} alt={alarmIcon} />
          </button>
        )}
      </div>
      <div className="order-item-staff-right">
        <img className="order-item-staff-right__avatar" src={ADuyMai} alt={ADuyMai} />
        <img src={icon} alt={icon} className="order-item-staff-right__next-icon" onClick={props.onClickChangeStatus} />
      </div>
    </div>
  );
};

export default OrderItemStaff;
