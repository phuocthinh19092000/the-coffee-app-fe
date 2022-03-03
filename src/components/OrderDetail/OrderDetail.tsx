import './OrderDetail.css';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import avatarDuyMai from '../../share/assets/img/avatarDuyMai.png';
import Order from '../../interfaces/order';
import Exit from '../../share/assets/vector/Exit.svg';
import { moneyFormat } from '../../utils/MoneyFormat';
import React from 'react';

interface Props {
  order: Order;
  onClickExit: React.MouseEventHandler<HTMLImageElement>;
}

const OrderDetail = (props: Props) => {
  const product = props.order.product;
  const user = props.order.user;

  return (
    <div className="order-detail">
      <div className="order-detail__title">
        <b>Order Details</b>
        <img className="order-detail__title-btn-exit" src={Exit} alt="Exit Icon" onClick={props.onClickExit} />
      </div>
      <div className="order-detail__information">
        <div className="dp-center">
          <img className="order-detail__img" src={CoffeeImg} alt="Avatar Drink" />
          <div className="order-detail__information-drink dp-center">
            <p>{product?.name}</p>
            <div className="dp-row">
              <p>
                {moneyFormat(product.price)} - Qty: {props.order.quantity} -&nbsp;
              </p>
              <p className={`order-detail--${props.order.orderStatus.name}`}> {props.order.orderStatus.name}</p>
            </div>
            {props.order.note && <p>Note: {props.order.note}.</p>}
          </div>
        </div>
        <div className="dp-center">
          <img className="order-detail__img" src={avatarDuyMai} alt="Avatar Customer" />
          <div className="order-detail__information-drink dp-center">
            <p>{user.name}</p>
            {/* <p> {user.phoneNumber} </p> */}
          </div>
        </div>
      </div>

      {/* //TODO: Hide button cancel order, cancel order feature not for mvp 
      <div className="order-detail__bottom">
        <button className="order-detail__btn-cancel"> Cancel Order </button>
      </div> */}
    </div>
  );
};

export default OrderDetail;
