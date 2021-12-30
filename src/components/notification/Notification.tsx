import './Notification.scss';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import { moneyFormat } from '../../utils/MoneyFormat';

interface Props {
  price: number;
  title: string;
  quantity: number;
  status: {
    color: string;
  };
  src?: string | undefined;
  onClickButton?: React.MouseEventHandler<HTMLButtonElement>;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const Notification = (props: Props) => {
  return (
    <div className="notification" onClick={props.onClick}>
      <div className="notification-item">
        <img src={CoffeeImg} className="notification-item__img" alt={CoffeeImg}></img>
        <div className="notification-item__detail dp-space-between">
          <div>
            <b className="notification-item__title">{props.title}</b>
            <div className="dp-row mt-10">
              <p>
                {moneyFormat(Number(props.price))} - Qty: {props.quantity} -
              </p>
              <pre className={`${props.status.color}`}> {props.status}</pre>
            </div>
          </div>
          {props.src ? (
            <button onClick={props.onClickButton}>
              <img src={props.src} alt={props.src}></img>
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
