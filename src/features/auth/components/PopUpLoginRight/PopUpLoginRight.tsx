import Card from '../../../../components/Card/Index';
import Icon from '../../../../components/Icon/Icon';
import LoginIcon from '../../../../share/assets/img/Login.png';
import FacebookIcon from '../../../../share/assets/vector/VectorFacebook.svg';
import InstaIcon from '../../../../share/assets/vector/VectorInsta.svg';
import LinkedinIcon from '../../../../share/assets/vector/VectorLinkedin.svg';
import './PopUpLoginRight.scss';
import HookForm from '../../../../components/HookForm/HookForm';

const PopUpLoginRight = () => {
  return (
    <Card className={`card card-login card--right`}>
      <div>
        <img src={LoginIcon} alt="" />
        <div>
          <HookForm />
        </div>
      </div>
      <div>
        <div className="brand-media">
          <Icon href='https://www.facebook.com/OneTechStopVietnam/' src={FacebookIcon} className='icon'/>
          <Icon href='https://www.instagram.com/OneTechStopVietnam/' src={InstaIcon} className='icon'/>
          <Icon href='https://www.linkedin.com/OneTechStopVietnam/' src={LinkedinIcon} className='icon'/>
        </div>
        <div className="card__content">
          <p>ONE TECH STOP VIET NAM</p>
        </div>
      </div>
    </Card>
  );
};

export default PopUpLoginRight;
