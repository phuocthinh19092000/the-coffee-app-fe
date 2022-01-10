import Card from '../../../../components/Card/Index';
import OrderItem from '../../components/OrderItem/OrderItem';
import './MyOrder.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { getUserDataState } from '../../../auth/actions/getUserInfo';
import Empty from '../../../../share/assets/img/Empty.png'
import Order from '../../../../interfaces/order';
import { groupBy } from 'lodash';
import { datePattern } from '../../../../utils/dateRegex';
import dayjs from 'dayjs';
import OrderDate from '../../components/OrderDate/OrderDate';
type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
  listOrder: Order[];
};
const MyOrder = (props: Props) => {
  const { freeUnit } = useSelector(getUserDataState);
  let data = groupBy(props.listOrder, function (date) {
    return dayjs(date.createdAt).format(datePattern);
  });
  const orderData = Object.entries(data);
  return (
    <div className="my-order--blur">
      <div className="out-side" onClick={props.onClick}>
      </div>
      <Card className={`card card-login card--right my-order`}>
        {orderData.length > 0 ? (
          <>
            <span className="my-order__title">My Orders</span>
            <span className="my-order__freeUnit">Today Free Units: <span className="accent">{freeUnit} </span></span>
            <div className="my-order__list-order">
              {orderData.map((item) => (
                <div className="my-order__list-order" key={item[0]} >
                  <OrderDate date={item[0]} />
                  {item[1].map((order) =>
                  <OrderItem item={order} key={order.id} />
                  )}

                </div>
              ))}
            </div>

          </>
        ): (
          <div>
          <img src={Empty} alt="empty"/>
          <h1 className="my-order__warning">No Order Yet!</h1>
          </div>
        )}


      </Card>
    </div>
  );
};
export default MyOrder;