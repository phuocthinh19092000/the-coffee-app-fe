import './OrderItem.scss';
import { moneyFormat } from '../../../../utils/MoneyFormat'
import { camelCase, startCase } from 'lodash';
import Order from '../../../../interfaces/order';
import CoffeeImg from '../../../../share/assets/img/CoffeeImg.png';
type Props = {
  item: Order;
}
enum OrderStatus {
  new = 'new',
  processing = 'processing',
  readyForPickUp = 'ready for pickup',
  pickedUp = 'picked up',
  canceled = 'canceled',
}
const OrderItem = (props: Props) => {
  const status = startCase(camelCase(props.item.orderStatus.name))
  let styleStatus = '';
  if (props.item.orderStatus.name === OrderStatus.new) {
    styleStatus = 'text-accent-1'
  } else if (props.item.orderStatus.name === OrderStatus.processing) {
    styleStatus = 'text-warning'
  } else if (props.item.orderStatus.name === OrderStatus.readyForPickUp) {
    styleStatus = 'text-success'
  }
  // TODO: edit order
  // let icon = '';
  // if(props.item.orderStatus.name === OrderStatus.new) {
  //   icon = EditIcon;
  // } else if(props.item.orderStatus.name === OrderStatus.readyForPickUp) {
  //   icon = SuccessIcon;
  // }
    return (
    <div className="order-item">

      <div className="order-item__contain">
        <div className="order-item__contain-left">
          <img src={props.item.product.images || CoffeeImg} alt="Drink" className="w-[100px] h-[100px] object-contain" />
        </div>
        <div className="order-item__contain-center">
          <p className="order-item__name">{props.item.product.name}</p>
          <p className="order-item__desc">{moneyFormat(Number(props.item.product.price))}đ - Qty: {props.item.quantity} - <span className={styleStatus}>{status}</span></p>
          {props.item.note !== '' ? (
            <p className="order-item__note">Note: {props.item.note}</p>
          ) : (
            ''
          )}
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
