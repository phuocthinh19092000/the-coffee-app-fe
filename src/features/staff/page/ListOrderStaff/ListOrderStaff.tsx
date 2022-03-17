import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnOrderStatus, OrderStatus, SocketEvent } from '../../../../enum';
import { getOrdersByStatus, selectOrderByStatusState, updateOrder } from '../../../orderStatus/action/orderStatus';
import { joinRoomStaff, onListenEventStaff } from '../../../../services/socketService';
import { useAppDispatch } from '../../../../storage/hooks';
import { SocketContext } from '../../../../utils/socketContext';

import ColumnOrderStaff from '../../../../components/ColumnOrderStaff/ColumnOrderStaff';
import './ListOrderStaff.scss';
import { OrderSocket } from '../../../../interfaces/order';

type Props = {
  setIsShowNotification: React.Dispatch<React.SetStateAction<boolean>>;
};

const ListOrderStaff = (props: Props) => {
  const dispatch = useAppDispatch();
  const ordersByStatus = useSelector(selectOrderByStatusState);
  const socket = useContext(SocketContext);

  useEffect(() => {
    dispatch(getOrdersByStatus(OrderStatus.NEW)).unwrap();
    dispatch(getOrdersByStatus(OrderStatus.PROCESSING)).unwrap();
    dispatch(getOrdersByStatus(OrderStatus.READY_FOR_PICKUP)).unwrap();
  }, []);

  const handleOrder = (data: OrderSocket) => {
    if (data.newOrderStatus) {
      switch (data.newOrderStatus) {
        case OrderStatus.PROCESSING:
          dispatch(updateOrder(data.order, OrderStatus.PROCESSING));
          break;

        case OrderStatus.READY_FOR_PICKUP:
          dispatch(updateOrder(data.order, OrderStatus.READY_FOR_PICKUP));
          break;

        case OrderStatus.CANCELED:
          dispatch(updateOrder(data.order, OrderStatus.CANCELED, data.currentOrderStatus as OrderStatus));
          break;

        case OrderStatus.DONE: {
          dispatch(updateOrder(data.order, OrderStatus.DONE));
          break;
        }
      }
    } else {
      dispatch(updateOrder(data.order, OrderStatus.NEW));
      const audio = new Audio('order.mp3');
      audio.play();
    }
  };

  useEffect(() => {
    joinRoomStaff(socket);
    onListenEventStaff(socket, SocketEvent.HANDLE_ORDER_EVENT, handleOrder);
    return () => {
      socket.off(SocketEvent.HANDLE_ORDER_EVENT);
    };
  }, [socket]);

  return (
    <div className="list-order">
      <ColumnOrderStaff title={ColumnOrderStatus.NEW} listOrder={ordersByStatus.orderStatusNew} />
      <ColumnOrderStaff title={ColumnOrderStatus.PROCESSING} listOrder={ordersByStatus.orderStatusProcessing} />
      <ColumnOrderStaff
        title={ColumnOrderStatus.READY_FOR_PICKUP}
        listOrder={ordersByStatus.orderStatusReady}
        setIsShowNotification={props.setIsShowNotification}
      />
    </div>
  );
};

export default ListOrderStaff;
