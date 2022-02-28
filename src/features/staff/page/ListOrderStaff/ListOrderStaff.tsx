import React, { useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnOrderStatus, OrderStatus, SocketEvent } from '../../../../enum';
import { getOrdersByStatus, selectOrderByStatusState, updateOrder } from '../../../orderStatus/action/orderStatus';
import { joinRoomStaff, onListenEvent } from '../../../../services/socketService';
import { useAppDispatch } from '../../../../storage/hooks';
import { SocketContext } from '../../../../utils/socketProvider';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          dispatch(updateOrder(data.order, OrderStatus.CANCELED));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    joinRoomStaff(socket);
    onListenEvent(socket, SocketEvent.HANDLE_ORDER_EVENT, handleOrder);
    return () => {
      socket.off(SocketEvent.HANDLE_ORDER_EVENT);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
