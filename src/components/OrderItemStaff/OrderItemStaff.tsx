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
import OrderDetail from '../OrderDetail/OrderDetail';
import { sendNotificationRemindPickUpOrder } from '../../features/notifications/action/notification';
import useComponentVisible from '../../utils/useComponentVisible';
interface Props {
  order: Order;
  setIsShowNotification?: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderItemStaff = (props: Props) => {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const dispatch = useAppDispatch();

  let icon = props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP ? iconPickedUp : nextIcon;

  const onUpdateStatusHandler = async (e: React.SyntheticEvent) => {
    e.stopPropagation();
    const valueNewStatus = props.order.orderStatus.value + 1;
    await dispatch(updateStatusOrder({ id: props.order.id, newStatus: valueNewStatus }));
  };

  const onShowDetailOrder = () => {
    setIsComponentVisible(true);
  };

  const onRemindOrder = async (e: React.SyntheticEvent) => {
    e.stopPropagation();

    const bodyNotificationPickUpOrderApi = {
      orderId: props.order.id,
    };
    await dispatch(sendNotificationRemindPickUpOrder(bodyNotificationPickUpOrderApi));
    props.setIsShowNotification && props.setIsShowNotification(true);
  };

  const onExitFormHandler = () => {
    setIsComponentVisible(false);
  };

  return (
    <>
      <div className="order-item-staff" onClick={onShowDetailOrder}>
        {/* TODO:  get image from API<img src={props.order.product.images} className='order-item__img' alt={props.order.product.images} /> */}
        <img src={CoffeeImg} className="order-item-staff__img" alt="Avatar Drink" />

        <div className="order-detail-staff">
          <div className="order-detail-staff__group">
            <div className="flex flex-row items-start justify-between">
              <b className="order-detail-staff__product">{props.order.product.name}</b>
              <img className="order-detail-staff__avatar" src={ADuyMai} alt="Avatar Customer" />
            </div>
            <div className="flex">
              <p className="order-detail-staff__price">
                {moneyFormat(Number(props.order.product.price))}
                {VN_CURRENCY_SYMBOL} - Qty: {props.order.quantity}
              </p>
              {props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP && (
                <img src={alarmIcon} alt={alarmIcon} className="order-detail-staff__alarm" onClick={onRemindOrder} />
              )}
              {props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP ? (
                <img src={icon} alt={icon} className="order-detail-staff__icon" />
              ) : (
                <img src={icon} alt={icon} className="order-detail-staff__icon__next" onClick={onUpdateStatusHandler} />
              )}
            </div>
            {props.order.note ? <p className="order-detail-staff__note">Note: {props.order.note}</p> : ''}
          </div>
        </div>
      </div>
      {isComponentVisible && (
        <div ref={ref} className="order-detail--blur">
          <OrderDetail order={props.order} onClickExit={onExitFormHandler} />
        </div>
      )}
    </>
  );
};

export default OrderItemStaff;
