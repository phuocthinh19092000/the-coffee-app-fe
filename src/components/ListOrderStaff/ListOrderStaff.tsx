import { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnOrderStatus, OrderStatus, SocketEvent } from '../../enum';
import {
  updateOrder,
  getOrdersByStatus,
  selectOrderByStatusState,
} from '../../features/orderStatus/action/orderStatus';

import { onListenEvent } from '../../services/socketService';
import { useAppDispatch } from '../../storage/hooks';
import { SocketContext } from '../../utils/socketProvider';

import ColumnOrderStaff from '../ColumnOrderStaff/ColumnOrderStaff';
import './ListOrderStaff.scss';
const ListOrderStaff = () => {
  const dispatch = useAppDispatch();
  const ordersByStatus = useSelector(selectOrderByStatusState);
  const socket = useContext(SocketContext);
  useEffect(() => {
    dispatch(getOrdersByStatus(OrderStatus.NEW)).unwrap();
    dispatch(getOrdersByStatus(OrderStatus.PROCESSING)).unwrap();
    dispatch(getOrdersByStatus(OrderStatus.READY_FOR_PICKUP)).unwrap();
    onListenEvent(socket, SocketEvent.CREATE_ORDER_EVENT, (order) => {
      dispatch(updateOrder(order, OrderStatus.NEW));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-order">
      <ColumnOrderStaff title={ColumnOrderStatus.NEW} listOrder={ordersByStatus.orderStatusNew} />
      <ColumnOrderStaff title={ColumnOrderStatus.PROCESSING} listOrder={ordersByStatus.orderStatusProcessing} />
      <ColumnOrderStaff title={ColumnOrderStatus.READY_FOR_PICKUP} listOrder={ordersByStatus.orderStatusReady} />
    </div>
  );
};

export default ListOrderStaff;
