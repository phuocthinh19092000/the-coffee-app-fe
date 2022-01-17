import Order from '../../interfaces/order';
import './OrderItemStaff.scss';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import { moneyFormat } from '../../utils/MoneyFormat';
import ADuyMai from '../../share/assets/img/aDuyMai.jpg';
import nextIcon from '../../share/assets/vector/NextIcon.svg';
import iconPickedUp from '../../share/assets/vector/IconpickedUp.svg';
import alarmIcon from '../../share/assets/vector/AlarmIcon.svg';
import { OrderStatus } from '../../enum/OrderStatus';
import { useState } from 'react';
interface Props {
  order: Order;
  onClickChangeStatus?: React.MouseEventHandler<HTMLElement>;
  onClickSendNotification?: React.MouseEventHandler<HTMLElement>;
}

const OrderItemStaff = (props: Props) => {
  const [showAlarmIcon, setShowAlarmIcon] = useState(() => {
    return props.order.orderStatus.name === OrderStatus.READY_TO_PICKUP;
  });

  let icon = props.order.orderStatus.name === OrderStatus.READY_TO_PICKUP ? iconPickedUp : nextIcon;

  let heightComponent = props.order.note ? 100 : 80;
  return (
    <div className="order">
      <div className={`order-item h-[${heightComponent}px]`}>
        <img src={CoffeeImg} className="order-item__img" alt={CoffeeImg} />
        {
          // TODO:  get image from API
          /* <img src={props.order.product.images} className='order-item__img' alt={props.order.product.images} /> */
        }
        <div className="order-detail">
          <b className="order-detail__product">{props.order.product.name}</b>
          <p className="order-detail__price">
            {moneyFormat(Number(props.order.product.price))}đ - Qty: {props.order.quantity}
          </p>
          {props.order.note ? <p className="order-detail__note">Note: {props.order.note}</p> : ''}
        </div>
        <div className="order-item__alarm">
          {showAlarmIcon && (
            <button onClick={props.onClickSendNotification}>
              <img src={alarmIcon} alt={alarmIcon} />
            </button>
          )}
        </div>
        <div className="order-item-right">
          <img className="order-item-right__avatar" src={ADuyMai} alt={ADuyMai} />
          <button onClick={props.onClickChangeStatus}>
            <img src={icon} alt={icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderItemStaff;
