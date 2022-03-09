import Button from '../../../../components/Button/Index';
import Card from '../../../../components/Card/Index';
import DrinkItem from '../../../product/components/DrinkItem/DrinkItem';
import Exit from '../../../../share/assets/vector/Exit.svg';
import './PopUpReceiveCanceledOrderCustomer.css';
import '../../../../features/order/components/DrinkDetail/DrinkItemDetail.scss';
import Order from '../../../../interfaces/order';

type Props = {
  order: Order;
  onClickCloseForm: React.MouseEventHandler;
};
const PopUpReceiveCanceledOrderCustomer = (props: Props) => {
  const product = props.order.product;

  /** TODO:
   * ADD Field reason into interface Order and add Reason for cancel order in line 34:
   *
   *    const reason = props.order.reason
   *
   **/

  return (
    <>
      <Card className="card card--center ">
        <img src={Exit} className="popup-detail__exit" alt="Exit Icon" onClick={props.onClickCloseForm} />
        <div className="order-canceled">
          <div>
            <p className="order-canceled__title">ORDER CANCELED</p>
            <DrinkItem item={product}></DrinkItem>
          </div>
          <div className="w-full">
            <p className="order-canceled__reason mb-[16px]">We’re sorry that your order has been canceled.</p>
            {/* <p className="order-canceled__reason">Reason: {reason}.</p> */}
          </div>
          <Button className="btn btn-primary btn--enabled" titleButton="OKAY, I SEE" onClick={props.onClickCloseForm} />
        </div>
      </Card>
    </>
  );
};

export default PopUpReceiveCanceledOrderCustomer;
