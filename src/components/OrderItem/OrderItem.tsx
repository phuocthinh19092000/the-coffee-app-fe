import './OrderItem.scss';
import DrinkImage from '../../share/assets/img/CoffeeImg.png';
import EditIcon from '../../share/assets/img/edit.png';
const OrderItem = () => {
  return (
    <div className="order-item">
      <p className="order-item__date">Dec 29, 2021</p>

      <div className="order-item__contain">
        <div className="order-item__contain-left">
          <img src={DrinkImage} alt="Drink" />
        </div>
        <div className="order-item__contain-center">
          <p className="order-item__name">Black Coffee</p>
          <p className="order-item__desc">19,000đ - Qty: 1 - Ready to Pickup</p>
          <p className="order-item__note">Note:</p>
        </div>
        <div className="order-item__contain-right">
          <div className="order-item__contain-icon">
          <img src={EditIcon} alt="Edit Icon" className="edit-icon" />
          </div>
        </div>
      </div>
      <div className="order-item__contain">
        <div className="order-item__contain-left">
          <img src={DrinkImage} alt="Drink" />
        </div>
        <div className="order-item__contain-center">
          <p className="order-item__name">Black Coffee</p>
          <p className="order-item__desc">19,000đ - Qty: 1 - New</p>
          <p className="order-item__note">Note:</p>
        </div>
        <div className="order-item__contain-right">
          <div className="order-item__contain-icon">
            <img src={EditIcon} alt="Edit Icon" className="edit-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderItem;
