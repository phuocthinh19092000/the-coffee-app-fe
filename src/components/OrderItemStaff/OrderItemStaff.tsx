import Order from '../../interfaces/order';
import avatarMiniUser from '../../share/assets/vector/AvatarMiniUser.svg';
import nextIcon from '../../share/assets/vector/nextIcon.svg';
import iconPickedUp from '../../share/assets/vector/iconpickedUp.svg';
import alarmIcon from '../../share/assets/vector/AlarmIcon.svg';
import OrderDetail from '../OrderDetail/OrderDetail';
import useComponentVisible from '../../utils/useComponentVisible';
import React, { useState } from 'react';
import { OrderStatus } from '../../enum';
import { useAppDispatch } from '../../storage/hooks';
import { updateStatusOrder } from '../../features/updateOrder/action/updateOrder';
import { moneyFormat } from '../../utils/MoneyFormat';
import { VN_CURRENCY_SYMBOL } from '../../constant';
import { sendNotificationRemindPickUpOrder } from '../../features/notifications/action/notification';
import BlackCoffeeImg from '../../share/assets/img/blackcoffee.png';
import './OrderItemStaff.scss';

interface Props {
  order: Order;
  setIsShowNotification?: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrderItemStaff = (props: Props) => {
  const [isDisabledUpdateOrder, setIsDisabledUpdateOrder] = useState(false);
  const [ref, isComponentVisible, setIsComponentVisible] = useComponentVisible(false);

  const dispatch = useAppDispatch();

  let icon = props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP ? iconPickedUp : nextIcon;

  const onUpdateStatusHandler =  (e: React.SyntheticEvent) => {
    e.stopPropagation();

    if (isDisabledUpdateOrder) {
      return;
    }
    setIsDisabledUpdateOrder(true);

    const valueNewStatus = props.order.orderStatus.value + 1;
    dispatch(updateStatusOrder({ id: props.order.id, newStatus: valueNewStatus }));

    setIsDisabledUpdateOrder(false);
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
        <img src={props.order.product.images || BlackCoffeeImg} className="order-item-staff__img" alt="Avatar Drink" />
        <div className="order-detail-staff">
          <div className="order-detail-staff__group">
            <div className="flex flex-row items-start justify-between">
              <b className="order-detail-staff__product">{props.order.product.name}</b>
              <img className="order-detail-staff__avatar" src={avatarMiniUser} alt="Avatar Customer" />
            </div>
            <div className="flex">
              <p className="order-detail-staff__price">
                {moneyFormat(Number(props.order.product.price))}
                {VN_CURRENCY_SYMBOL} - Qty: {props.order.quantity}
              </p>
              {props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP && (
                <img src={alarmIcon} alt={alarmIcon} className="order-detail-staff__alarm" onClick={onRemindOrder} />
              )}
              <img
                src={icon}
                alt={icon}
                className={
                  props.order.orderStatus.name === OrderStatus.READY_FOR_PICKUP
                    ? 'order-detail-staff__icon'
                    : 'order-detail-staff__icon__next'
                }
                onClick={onUpdateStatusHandler}
              />
            </div>
            {props.order.note ? <p className="order-detail-staff__note">Note: {props.order.note}</p> : ''}
          </div>
        </div>
      </div>
      {isComponentVisible && (
        <div ref={ref} className="background-blur">
          <OrderDetail
            order={props.order}
            onClickExit={onExitFormHandler}
            onClosePopUpConfirmCancel={setIsComponentVisible}
          />
        </div>
      )}
    </>
  );
};

export default OrderItemStaff;
