import { useState } from 'react';
import { useHistory } from 'react-router';
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
import usersData from '../../json/seed_users.json';

import './styles.scss';

const Login = () => {
  const history = useHistory();

  const [enteredUserName, setEnteredUserName] = useState('');
  const userNameChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEnteredUserName(event.target.value);
  };

  const [enteredPassword, setEnteredPassword] = useState('');
  const passwordChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setEnteredPassword(event.target.value);
  };

  let isValid = false;
  if (enteredUserName.trim() !== '' && enteredPassword.trim() !== '') {
    isValid = true;
  }

  const loginHandler: React.FormEventHandler<HTMLFormElement> = (event) => {
    if (isValid === false) {
      event.preventDefault();
      return;
    }

    let user = usersData.find((u) => u.username === enteredUserName && u.password === enteredPassword);

    if (user !== undefined) {
      localStorage.setItem('user', JSON.stringify(user));
      history.push('/');
      return;
    }

    alert('Username or Password is not correct');
    setEnteredPassword('');
    event.preventDefault();
  };

  return (
    <Card className={`card right`}>
      <div>
        <img src={LoginIcon} alt="" />
        <div>
          <form onSubmit={loginHandler}>
            <Input
              type="text"
              placeholder="username"
              className="type-input login-input"
              src={UserIcon}
              value={enteredUserName}
              onChange={userNameChangeHandler}
            />
            <Input
              type="password"
              placeholder="password"
              className="type-input login-input"
              src={EyeIcon}
              value={enteredPassword}
              onChange={passwordChangeHandler}
            />
            <Button className={`primary ${isValid ? 'enabled' : 'disabled'}`} titleButton="Login" />
          </form>
        </div>
        <div className="display-center">
          <a href="XXX" target="_blank" rel="noreferrer">
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
        <div className="display-center">
          <p>ONE TECH STOP VIET NAM</p>
        </div>
      </div>
    </Card>
  );
};

export default Login;
