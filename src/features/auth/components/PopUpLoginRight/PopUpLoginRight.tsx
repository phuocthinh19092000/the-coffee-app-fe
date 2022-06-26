import Card from '../../../../components/Card/Index';
import Icon from '../../../../components/Icon/Icon';
import LoginIcon from '../../../../share/assets/img/Login.png';
import FacebookIcon from '../../../../share/assets/vector/VectorFacebook.svg';
import InstaIcon from '../../../../share/assets/vector/VectorInsta.svg';
import LinkedinIcon from '../../../../share/assets/vector/VectorLinkedin.svg';
import './PopUpLoginRight.css';
import HookForm from '../../../../components/HookForm/HookForm';
import { myTitle } from '../../../../constant/myConstant';
const PopUpLoginRight = () => {
  return (
    <Card className="card card-login card--right scroll-popup-right">
      <div className="md:pt-[140px] xxl:pt-[120px]">
        <img src={LoginIcon} alt="Login Icon" />
        <div>
          <HookForm />
        </div>
      </div>
      <div className="sm:hidden md:block">
        <div className="brand-media">
          <Icon href="https://www.facebook.com/OneTechStopVietnam/" src={FacebookIcon} className="icon" />
          <Icon href="https://www.instagram.com/OneTechStopVietnam/" src={InstaIcon} className="icon" />
          <Icon href="https://www.linkedin.com/OneTechStopVietnam/" src={LinkedinIcon} className="icon" />
        </div>
        <div className="card__content">
          <p className="text-center">{myTitle.MY_NAME}</p>
        </div>
      </div>
    </Card>
  );
};

export default PopUpLoginRight;
