import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ColumnOrderStatus, OrderStatus } from '../../enum';
import { getOrdersByStatus, selectOrderByStatusState } from '../../features/orderStatus/action/orderStatus';
import { useAppDispatch } from '../../storage/hooks';
import ColumnOrderStaff from '../ColumnOrderStaff/ColumnOrderStaff';
import './ListOrderStaff.scss';
const ListOrderStaff = () => {
  const dispatch = useAppDispatch();
  const ordersByStatus = useSelector(selectOrderByStatusState);

  useEffect(() => {
    dispatch(getOrdersByStatus(OrderStatus.NEW)).unwrap();
    dispatch(getOrdersByStatus(OrderStatus.PROCESSING)).unwrap();
    dispatch(getOrdersByStatus(OrderStatus.READY_FOR_PICKUP)).unwrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="list-order">
      <ColumnOrderStaff title={ColumnOrderStatus.NEW} listOrder={ordersByStatus.orderStatusNew}></ColumnOrderStaff>
      <ColumnOrderStaff
        title={ColumnOrderStatus.PROCESSING}
        listOrder={ordersByStatus.orderStatusProcessing}
      ></ColumnOrderStaff>
      <ColumnOrderStaff
        title={ColumnOrderStatus.READY_FOR_PICKUP}
        listOrder={ordersByStatus.orderStatusReady}
      ></ColumnOrderStaff>
    </div>
  );
};

export default ListOrderStaff;
