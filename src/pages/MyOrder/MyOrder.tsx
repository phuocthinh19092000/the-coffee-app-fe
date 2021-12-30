import Card from '../../components/Card/Index';
import OrderItem from '../../components/OrderItem/OrderItem';
import './MyOrder.scss';
import React from 'react';
type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
};
const MyOrder = (props: Props) => {
  return (
    <div className="my-order--blur">
      <div className="out-side" onClick={props.onClick}>
      </div>
      <Card className={`card card-login card--right my-order`}>
        <div>
          <span className="my-order__title">My Orders</span>
          <span className="my-order__freeUnit">Today Free Units: 2</span>
        </div>
        <div className="my-order__list-order">
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </div>
      </Card>
    </div>
  );
};
export default MyOrder;
