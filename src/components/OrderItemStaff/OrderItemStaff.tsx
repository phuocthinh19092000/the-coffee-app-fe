import Order from '../../interfaces/order';
import './OrderItemStaff.scss';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import ADuyMai from '../../share/assets/img/aDuyMai.jpg';
import nextIcon from '../../share/assets/vector/nextIcon.svg';
import iconPickedUp from '../../share/assets/vector/iconpickedUp.svg';
import alarmIcon from '../../share/assets/vector/AlarmIcon.svg';
import { OrderStatus } from '../../enum';
import { useAppDispatch } from '../../storage/hooks';
import { updateStatusOrder } from '../../features/updateOrder/action/updateOrder';
import { moneyFormat } from '../../utils/MoneyFormat';
import { VN_CURRENCY_SYMBOL } from '../../constant';
import { sendNotificationRemindPickUpOrder } from '../../features/notifications/action/notification';
interface Props {
  order: Order;
  onClickSendNotification?: React.MouseEventHandler<HTMLElement>;
}

const OrderItemStaff = (props: Props) => {
  const dispatch = useAppDispatch();
  let icon = props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP ? iconPickedUp : nextIcon;

  const onUpdateStatusHandler = async () => {
    const valueNewStatus = props.order.orderStatus.value + 1;
    await dispatch(updateStatusOrder({ id: props.order.id, newStatus: valueNewStatus }));
  };

  const onRemindOrder = async () => {
    const bodyNotificationPickUpOrderApi = {
      orderId: props.order.id,
    };
    await dispatch(sendNotificationRemindPickUpOrder(bodyNotificationPickUpOrderApi));
  };

  return (
    <div className="order-item-staff">
      {/* TODO:  get image from API<img src={props.order.product.images} className='order-item__img' alt={props.order.product.images} /> */}
      <img src={CoffeeImg} className="order-item-staff__img" alt="Avatar Drink" />

      <div className="order-detail-staff">
        <b className="order-detail-staff__product">{props.order.product.name}</b>
        <p className="order-detail-staff__price">
          {moneyFormat(Number(props.order.product.price))}
          {VN_CURRENCY_SYMBOL} - Qty: {props.order.quantity}
        </p>
        {props.order.note ? <p className="order-detail-staff__note">Note: {props.order.note}</p> : ''}
      </div>
      <div className="order-item-staff__alarm">
        {props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP && (
          <button onClick={onRemindOrder}>
            <img src={alarmIcon} alt={alarmIcon} />
          </button>
        )}
      </div>
      <div className="order-item-staff-right">
        <img className="order-item-staff-right__avatar" src={ADuyMai} alt="Avatar Customer" />
        <img src={icon} alt={icon} className="order-item-staff-right__next-icon" onClick={onUpdateStatusHandler} />
      </div>
    </div>
  );
};

export default OrderItemStaff;
