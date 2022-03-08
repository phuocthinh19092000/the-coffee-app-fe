import Card from '../../../../components/Card/Index';
import OrderItem from '../../components/OrderItem/OrderItem';
import './MyOrder.scss';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUserState } from '../../../auth/actions/auth';
import Empty from '../../../../share/assets/img/Empty.png';
import { groupBy } from 'lodash';
import { datePattern } from '../../../../utils/dateRegex';
import dayjs from 'dayjs';
import OrderDate from '../../components/OrderDate/OrderDate';
import { useAppDispatch } from '../../../../storage/hooks';
import { getMyOrderLoading, getMyOrders, getMyOrderState } from '../../actions/historyOrder';
import Spinner from '../../../../components/Spinner/Spinner';
import { RequestState } from '../../../../enum';

type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
};
const MyOrder = (props: Props) => {
  const { freeUnit } = useSelector(selectUserState);
  const dispatch = useAppDispatch();
  const myOrder = useSelector(getMyOrderState);
  const loading = useSelector(getMyOrderLoading);

  useEffect(() => {
    dispatch(getMyOrders()).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let orderData = groupBy(myOrder, function (date) {
    return dayjs(date.createdAt).format(datePattern);
  });
  return (
    <div className="background-blur">
      <div className="out-side" onClick={props.onClick} />
      <Card className={`card card-login card--right my-order`}>
        {loading === RequestState.PENDING ? (
          <Spinner />
        ) : Object.keys(orderData).length > 0 ? (
          <>
            <span className="my-order__title">My Orders</span>
            <span className="my-order__freeUnit">
              Today Free Units: <span className="accent">{freeUnit} </span>
            </span>
            <div className="my-order__list-order">
              {Object.keys(orderData).map((date) => (
                <div className="my-order__list-order" key={date}>
                  <OrderDate date={date} />
                  {orderData[date].map((order) => (
                    <OrderItem item={order} key={order.id} />
                  ))}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div>
            <img src={Empty} alt="empty" />
            <h1 className="my-order__warning">No Order Yet!</h1>
          </div>
        )}
      </Card>
    </div>
  );
};
export default MyOrder;
