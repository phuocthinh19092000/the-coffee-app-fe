import Card from '../Card/Index';
import Button from '../Button/Index';
import Exit from '../../share/assets/vector/Exit.svg';
import OrderConfirmed from '../../share/assets/img/OrderConfirmed.png';
import '../PopUpFinishOrder/PopUpFinishOrder.scss';
import { useState, useRef, useEffect } from 'react';

type Props = {
  onClick?: React.MouseEventHandler<HTMLImageElement>;
};

function PopUpFinishOrder(props: Props) {
  // ---- Handle OutSide click ---- //
  const [isOpen, setIsOpen] = useState(false);
  const popUpDrinkItemRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: Event) => {
    if (popUpDrinkItemRef.current && !popUpDrinkItemRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen]);
  // ---------------------------------------------------------------- //
  return (
    <Card className="card card--center card-confirm-order">
      <a>
        <img src={Exit} className="card-confirm-order__exit" onClick={props.onClick}></img>
      </a>
      <div className="card-confirm-order__img">
        <img src={OrderConfirmed} alt="Order Confirmed Image" className="card-confirm-order__img--style" />
      </div>
      <h2 className="card-confirm-order__title">ORDER PLACED!</h2>
      <p className="card-confirm-order__description">You will be notified to pick up when drink is ready.</p>

      <Button className="btn btn-primary btn--enabled card-confirm-order__button " titleButton="OKAY, I SEE" />
    </Card>
  );
}

export default PopUpFinishOrder;
