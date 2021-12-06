import Card from '../Card/Index';
import Button from '../Button/Index';
import Exit from '../../share/assets/vector/Exit.svg';
import OrderConfirmed from '../../share/assets/img/OrderConfirmed.png';
import '../PopUpFinishOrder/PopUpFinishOrder.scss';

type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
};

function PopUpFinishOrder(props: Props) {
  return (
    <div className="card-confirm-order--blur">
      <Card className="card card--center card-confirm-order">
        <a>
          <img src={Exit} className="card-confirm-order__exit" onClick={props.onClick}></img>
        </a>
        <div className="card-confirm-order__img">
          <img src={OrderConfirmed} alt="Order Confirmed Image" className="card-confirm-order__img--style" />
        </div>
        <h2 className="card-confirm-order__title">ORDER PLACED!</h2>
        <p className="card-confirm-order__description">You will be notified to pick up when drink is ready.</p>

        <Button
          onClick={props.onClick}
          className="btn btn-primary btn--enabled card-confirm-order__btn "
          titleButton="OKAY, I SEE"
        />
      </Card>
    </div>
  );
}

export default PopUpFinishOrder;
