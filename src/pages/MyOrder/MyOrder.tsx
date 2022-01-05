import Card from '../../components/Card/Index';
import OrderItem from '../../components/OrderItem/OrderItem';
import './MyOrder.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { getUserDataState } from '../../features/auth/actions/getUserInfo';
import Order from '../../interfaces/order';
type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
  listOrder: Order[];
};
const MyOrder = (props: Props) => {
  const { freeUnit } = useSelector(getUserDataState);

  return (
    <div className="my-order--blur">
      <div className="out-side" onClick={props.onClick}>
      </div>
      <Card className={`card card-login card--right my-order`}>
        <div>
          <span className="my-order__title">My Orders</span>
          <span className="my-order__freeUnit">Today Free Units: <span className="accent">{freeUnit} </span></span>
        </div>
        <div>
          {props.listOrder.map((item) => (
            <div className="my-order__list-order"  key={item.id}>
              <OrderItem item={item} />
            </div>
          ))}
        </div>

      </Card>
    </div>
  );
};
export default MyOrder;