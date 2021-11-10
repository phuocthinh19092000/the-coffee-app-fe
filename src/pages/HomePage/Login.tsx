import Card from '../../components/Card/Index';
import Button from '../../components/Button/Index';
import Input from '../../components/Input/Input';
import Icon from '../../components/Icon/Icon';
import LoginIcon from '../../share/assets/img/Login.png';
import FacebookIcon from '../../share/assets/vector/VectorFacebook.svg';
import InstaIcon from '../../share/assets/vector/VectorInsta.svg';
import LinkedinIcon from '../../share/assets/vector/VectorLinkedin.svg';
import UserIcon from '../../share/assets/vector/User.svg';
import EyeIcon from '../../share/assets/vector/Eye.svg';
import './styles.scss';
const Login = () => {
  return (
    <Card className="card right">
      <div className="mb-20">
        <img src={LoginIcon} alt="" />
      </div>
      <div className="mtb-40">
        <form>
          <div className="mb-40">
            <Input type="text" placeholder="username" className="type-input login-input" src={UserIcon} />
            <Input type="password" placeholder="password" className="type-input login-input" src={EyeIcon} />
          </div>
          <Button className="primary enabled" titleButton="Login" type="submit" />
        </form>
      </div>
      <div className="display-center">
        <a href="#" target="_blank" rel="noreferrer">
          Forget Password?
        </a>
      </div>
      <div className="brand-media">
        <Icon src={FacebookIcon} className="icon"></Icon>
        <Icon src={InstaIcon} className="icon"></Icon>
        <Icon src={LinkedinIcon} className="icon"></Icon>
      </div>
      <div className="mt-10 display-center">
        <p>ONE TECH STOP VIET NAM</p>
      </div>
    </Card>
  );
};
export default Login;
