import { useEffect, useState } from 'react';
import Input from '../Input/Input';
import usersData from '../../json/seed_users.json';
import Button from '../Button/Index';
import UserIcon from '../../share/assets/vector/User.svg';
import EyeIcon from '../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../share/assets/img/close-eye.png';
enum timeInterval {
  timeInterval = 150,
}

function FormLogin() {
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
      alert('Login Success!');
      return;
    }

    alert('Username or Password is not correct');
    setEnteredPassword('');
    event.preventDefault();
  };

  return (
    <>
      <form onSubmit={loginHandler}>
        <Input
          type="text"
          placeholder="Username"
          className="block-input login-input"
          src={UserIcon}
          value={enteredUserName}
          onChange={userNameChangeHandler}
        />
        <Input
          type={isShowPassword ? 'text' : 'password'}
          placeholder="Password"
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
      <div className="card-login__content">
        <a className="card-login__content--accent" href="XXX" target="_blank" rel="noreferrer">
          Forget Password?
        </a>
      </div>
    </>
  );
}

export default FormLogin;
