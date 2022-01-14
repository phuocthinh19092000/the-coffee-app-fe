import Order from '../../interfaces/order';
import './OrderItemStaff.scss';
import CoffeeImg from '../../share/assets/img/blackcoffee.png';
import { moneyFormat } from '../../utils/MoneyFormat';
import ADuyMai from '../../share/assets/img/aDuyMai.jpg'
import nextIcon from '../../share/assets/vector/nextIcon.svg'
import iconPickedUp from '../../share/assets/vector/iconpickedUp.svg'
interface Props {
    order: Order;
    onClickChangeStatus?: React.MouseEventHandler<HTMLElement>;
}
enum OrderStatus {
    new = 'new',
    processing = 'processing',
    readyForPickUp = 'ready for pickup',
    pickedUp = 'picked up',
    canceled = 'canceled',
}

const OrderItemStaff = (props: Props) => {

    let icon = '';
    if (props.order.orderStatus.name === OrderStatus.pickedUp)
        icon = iconPickedUp;
    else
        icon = nextIcon;

    return (
        <div className="order">
            <div className='order-item'>
                <img src={CoffeeImg} className='order-item__img' alt={CoffeeImg} />
                // TODO:  get image from API 
                {/* <img src={props.order.product.images} className='order-item__img' alt={props.order.product.images} /> */}
                <div className='order-detail'>
                    <b className='order-detail__product'>{props.order.product.name}</b>
                    <p className='order-detail__price'>
                        {moneyFormat(Number(props.order.product.price))}đ - Qty: {props.order.quantity}
                    </p>
                    {
                        props.order.note ?
                            <p className='order-detail__note'>
                                {props.order.note}
                            </p> :
                            ''
                    }
                </div>

                <div className='order-item-right'>
                    <img className='order-item-right__avatar' src={ADuyMai} alt={ADuyMai} />
                    <button onClick={props.onClickChangeStatus}>
                        <img src={icon} alt={icon} />
                    </button>
                </div>
            </div>
        </div>




    );
}

export default OrderItemStaff;