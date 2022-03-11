import './Notification.scss';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import { moneyFormat } from '../../utils/MoneyFormat';
import EditIcon from '../../share/assets/vector/EditIcon.svg';
import SuccessIcon from '../../share/assets/vector/SuccessIcon.svg';
import { OrderStatus } from '../../enum';
import React from 'react';
interface Props {
  price: number;
  title: string;
  quantity: number;
  status: string;
  image: string;
  onClickButton?: React.MouseEventHandler<HTMLButtonElement>;
  onClickNotification?: React.MouseEventHandler<HTMLDivElement>;
}

const Notification = (props: Props) => {
  let btnSrc = '';
  if (props.status === OrderStatus.NEW) {
    btnSrc = EditIcon;
  } else if (props.status === OrderStatus.READY_FOR_PICKUP) {
    btnSrc = SuccessIcon;
  }

  return (
    <div className="notification" onClick={props.onClickNotification}>
      <div className="notification-item">
        <img src={props.image || CoffeeImg} className="notification-item__img" alt={CoffeeImg} />
        <div className="notification-item__detail dp-space-between">
          <div>
            <b className="notification-item__title">{props.title}</b>
            <div className="dp-row mt-10">
              <p>
                {moneyFormat(Number(props.price))}đ - Qty: {props.quantity} -
              </p>
              <pre className={`notification--${props.status}`}> {props.status}</pre>
            </div>
          </div>
          {btnSrc ? (
            <button className="notification__btn" onClick={props.onClickButton}>
              <img src={btnSrc} alt={btnSrc} />
            </button>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
export default Notification;
