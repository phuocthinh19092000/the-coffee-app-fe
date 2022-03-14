import './OrderItem.scss';
import { moneyFormat } from '../../../../utils/MoneyFormat';
import { camelCase, startCase } from 'lodash';
import Order from '../../../../interfaces/order';
import CoffeeImg from '../../../../share/assets/img/CoffeeImg.png';
type Props = {
  item: Order;
};
enum OrderStatus {
  new = 'new',
  processing = 'processing',
  readyForPickUp = 'ready for pickup',
  pickedUp = 'picked up',
  canceled = 'canceled',
}
const setColorStatus = (status: string) => {
  switch (status) {
    case OrderStatus.new:
      return 'text-accent-1';
    case OrderStatus.processing:
      return 'text-warning';
    case OrderStatus.readyForPickUp:
      return 'text-success';
    case OrderStatus.canceled:
      return 'text-error';
  }
};

const OrderItem = (props: Props) => {
  const status = props.item.orderStatus.name;

  return (
    <div className="order-item">
      <div className="order-item__contain">
        <div className="order-item__contain-left">
          <img
            src={props.item.product.images || CoffeeImg}
            alt="Drink"
            className="w-[100px] h-[100px] object-contain"
          />
        </div>
        <div className="order-item__contain-center">
          <p className="order-item__name">{props.item.product.name}</p>
          <p className="order-item__desc">
            {moneyFormat(Number(props.item.product.price))}đ - Qty: {props.item.quantity} -{' '}
            <span className={setColorStatus(status)}>{startCase(camelCase(status))}</span>
          </p>
          {props.item.note && <p className="order-item__note">Note: {props.item.note}</p>}
          {props.item.reason && <p className="order-item__note text-error">Reason: {props.item.reason}</p>}
        </div>
        {/*TODO: edit order*/}
        {/*<div className="order-item__contain-right">*/}
        {/*  {icon ? (*/}
        {/*    <div className="order-item__contain-icon">*/}
        {/*      <img src={icon} alt={icon} />*/}
        {/*    </div>*/}
        {/*  ) : (*/}
        {/*    <div className="order-item__contain-icon">*/}
        {/*    </div>*/}
        {/*  )}*/}
        {/*</div>*/}
      </div>
    </div>
  );
};
export default OrderItem;
