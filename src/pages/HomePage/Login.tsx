import { useEffect, useState } from 'react';
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
import CloseEyeIcon from '../../share/assets/img/close-eye.png';
import usersData from '../../json/seed_users.json';
import './styles.scss';

enum timeInterval {
  timeInterval = 150,
}

const Login = () => {
  const [enteredUserName, setEnteredUserName] = useState('');
  const userNameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEnteredUserName(event.target.value);
  };

  const [enteredPassword, setEnteredPassword] = useState('');
  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEnteredPassword(event.target.value);
  };

  const [isShowPassword, setIsShowPassword] = useState(false);
  const passwordShowHandler = () => {
    setIsShowPassword(!isShowPassword);
  };

  const [inputIsValid, setInputIsValid] = useState(false);

  useEffect(() => {
    const checkIsValid = setTimeout(() => {
      setInputIsValid(enteredUserName.trim() !== '' && enteredPassword.trim() !== '');
    }, timeInterval.timeInterval);
    return () => {
      clearTimeout(checkIsValid);
    };
  }, [enteredUserName, enteredPassword]);

  const loginHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    if (inputIsValid === false) {
      event.preventDefault();
      return;
    }

    let user = usersData.find((u) => u.username === enteredUserName && u.password === enteredPassword);

    if (user !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
      return;
    }

    alert('Username or Password is not correct');
    setEnteredPassword('');
    event.preventDefault();
  };

  return (
    <Card className={`card card-login card--right`}>
      <div>
        <img src={LoginIcon} alt="" />
        <div>
          <form onSubmit={loginHandler}>
            <Input
              type="text"
              placeholder="username"
              className="block-input login-input"
              src={UserIcon}
              value={enteredUserName}
              onChange={userNameChangeHandler}
            />
            <Input
              type={isShowPassword ? 'text' : 'password'}
              placeholder="password"
              className="block-input login-input"
              src={isShowPassword ? CloseEyeIcon : EyeIcon}
              value={enteredPassword}
              onChange={passwordChangeHandler}
              onClickFirstIcon={passwordShowHandler}
            />
            <div>
              <Button
                className={`btn btn-primary ${inputIsValid ? 'btn--enabled' : 'btn--disabled'}`}
                titleButton="Login"
              />
            </div>
          </form>
        </div>
        <div className="card-login__content">
          <a className="card-login__content--accent" href="XXX" target="_blank" rel="noreferrer">
            Forget Password?
          </a>
        </div>
      </div>
      <div>
        <div className="brand-media">
          <Icon href="https://www.facebook.com/OneTechStopVietnam/" src={FacebookIcon} className="icon"></Icon>
          <Icon href="https://www.instagram.com/OneTechStopVietnam/" src={InstaIcon} className="icon"></Icon>
          <Icon href="https://www.linkedin.com/OneTechStopVietnam/" src={LinkedinIcon} className="icon"></Icon>
        </div>
        <div className="card__content">
          <p>ONE TECH STOP VIET NAM</p>
        </div>
      </div>
    </Card>
  );
};

export default Login;
