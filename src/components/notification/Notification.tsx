import './Notification.scss';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import { moneyFormat } from '../../utils/MoneyFormat';
import EditIcon from '../../share/assets/vector/EditIcon.svg';
import SuccessIcon from '../../share/assets/vector/SuccessIcon.svg';
interface Props {
  price: number;
  title: string;
  quantity: number;
  status: string;
  onClickButton?: React.MouseEventHandler<HTMLButtonElement>;
  onClickNotification?: React.MouseEventHandler<HTMLDivElement>;
}

enum OrderStatus {
  new = 'new',
  processing = 'processing',
  readyForPickUp = 'ready for pickup',
  pickedUp = 'picked up',
  canceled = 'canceled',
}

const Notification = (props: Props) => {
  let btnSrc = '';
  if (props.status === OrderStatus.new) {
    btnSrc = EditIcon;
  } else if (props.status === OrderStatus.readyForPickUp) {
    btnSrc = SuccessIcon;
  }

  return (
    <div className="notification" onClick={props.onClickNotification}>
      <div className="notification-item">
        <img src={CoffeeImg} className="notification-item__img" alt={CoffeeImg}></img>
        <div className="notification-item__detail dp-space-between">
          <div>
            <b className="notification-item__title">{props.title}</b>
            <div className="dp-row mt-10">
              <p>
                {moneyFormat(Number(props.price))} - Qty: {props.quantity} -
              </p>
              <pre className={`notification--${props.status}`}> {props.status}</pre>
            </div>
          </div>
          {btnSrc ? (
            <button onClick={props.onClickButton}>
              <img src={btnSrc} alt={btnSrc}></img>
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
