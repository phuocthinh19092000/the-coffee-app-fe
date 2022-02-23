import { ColumnOrderStatus } from '../../enum';
import Order from '../../interfaces/order';
import OrderItemStaff from '../OrderItemStaff/OrderItemStaff';
import './ColumnOrderStaff.scss';
import React from 'react';

type Props = {
  title: ColumnOrderStatus;
  listOrder: Order[];
  setIsShowNotification?: React.Dispatch<React.SetStateAction<boolean>>;
};
const ColumnOrderStaff = (props: Props) => {
  return (
    <div className="column-order">
      <div className="column-order-header">
        <p className="column-order-header__title">
          {props.title} {props.listOrder.length}
        </p>
      </div>
      <div className="column-order__content">
        {props.listOrder.map((order) => (
          <OrderItemStaff order={order} key={order.id} setIsShowNotification={props.setIsShowNotification} />
        ))}
      </div>
    </div>
  );
};

export default ColumnOrderStaff;
