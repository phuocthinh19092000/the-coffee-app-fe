import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './HookForm.scss';
import { useAppDispatch } from '../../storage/hooks';
import { checkRole, login, selectUserState } from '../../features/auth/actions/auth';
import { useState } from 'react';
import UserIcon from '../../share/assets/vector/User.svg';
import EyeIcon from '../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../share/assets/img/close-eye.png';
import { getDeviceToken } from '../../services/firebase';
import { useHistory } from 'react-router';
import { ROLE } from '../../enum';
import { useSelector } from 'react-redux';

interface IFormInputs {
  email: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    email: yup.string().email('Email must be a valid email address').required('Email is required'),

    password: yup.string().min(8, 'Password must be at least 6 characters').required('Password is required'),
  })
  .required();

export default function HookForm() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',

    defaultValues: {
      email: '',
      password: '',
    },
  });
  const [loginFailed, setLoginFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector(selectUserState);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const deviceToken = await getDeviceToken();
    await dispatch(login({ email: data.email, password: data.password, deviceToken: deviceToken }));
    dispatch(checkRole([ROLE.CUSTOMER]));
    if (user.role === ROLE.CUSTOMER) {
      setLoginFailed(false);
    } else {
      setLoginFailed(true);
      reset({ email: '', password: '' });
    }
  };
  const history = useHistory();
  const staffLogin = () => {
    let path = `/login`;
    history.push(path);
  };

  const handleResetDefault = () => {
    setLoginFailed(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field">
        <input {...register('email')} placeholder="Email" onFocus={handleResetDefault} />
        <img src={UserIcon} alt="User Icon" />
      </div>
      {errors.email && <p className="error">{errors.email?.message}</p>}

      <div className="input-field">
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder="Password"
          onFocus={handleResetDefault}
        />
        <img
          src={showPassword ? CloseEyeIcon : EyeIcon}
          onClick={toggleShowPassword}
          className="toggle"
          alt="Icon Password"
        />
      </div>
      {errors.password && <p className="error">{errors.password?.message}</p>}

      {loginFailed && <p className="error">{'Username or password incorrect'}</p>}
      <button className="submit-btn" type="submit">
        LOGIN
      </button>
      <p className="forget-password" onClick={staffLogin}>
        You are Staff?
      </p>
    </form>
  );
}
