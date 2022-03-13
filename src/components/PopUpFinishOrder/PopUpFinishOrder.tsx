import Card from '../Card/Index';
import Button from '../Button/Index';
import Exit from '../../share/assets/vector/Exit.svg';
import OrderImage from '../../share/assets/img/finish-order.png';
import '../PopUpFinishOrder/PopUpFinishOrder.scss';

type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
  description?: string;
  title?: string;
};

function PopUpFinishOrder(props: Props) {
  return (
    <Card className="card card--center card-confirm-order">
      <img src={Exit} className="card-confirm-order__exit" onClick={props.onClick} alt="Exit Icon" />

      <div className="card-confirm-order__img">
        <img src={OrderImage} alt="Order Confirmed" />
      </div>
      <h2 className="card-confirm-order__title">{props.title || 'ORDER PLACED!'}</h2>
      <p className="card-confirm-order__description">
        {props.description || 'You will be notified to pick up when drink is ready.'}
      </p>

      <Button
        onClick={props.onClick}
        className="btn btn-primary btn--enabled card-confirm-order__btn "
        titleButton="OKAY, I SEE"
      />
    </Card>
  );
}

export default PopUpFinishOrder;
