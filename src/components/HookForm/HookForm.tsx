import { useForm, SubmitHandler } from 'react-hook-form';
import usersData from '../../json/seed_users.json';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import './HookForm.scss';
import { useAppDispatch, useAppSelector } from '../../storage/hooks';
import { login, selectLoginState } from '../../features/auth/actions/login';
import http from '../../services/http-common';
import { useState } from 'react';
import UserIcon from '../../share/assets/vector/User.svg';
import EyeIcon from '../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../share/assets/img/close-eye.png';
interface IFormInputs {
  username: string;
  password: string;
}

const schema = yup
  .object()
  .shape({
    username: yup.string().min(6, 'Username must be at least 6 characters').required('Username is required'),

    password: yup.string().min(8, 'Password must be at least 6 characters').required('Password is required'),
  })
  .required();

export default function HookForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: 'onChange',

    defaultValues: {
      username: '',
      password: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useAppDispatch();
  const history = useHistory();
  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    dispatch(login({ username: data.username, password: data.password }));
    history.push('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field">
        <input {...register('username')} placeholder="Usename" />
        <img src={UserIcon} />
      </div>
      {errors.username && <p className="error">{errors.username?.message}</p>}

      <div className="input-field">
        <input type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="Password" />
        <img src={showPassword ? CloseEyeIcon : EyeIcon} onClick={toggleShowPassword} className="toggle" />
      </div>
      {errors.password && <p className="error">{errors.password?.message}</p>}

      <button className="submit-btn" type="submit">
        LOGIN
      </button>
      <p className="forget-password">Forget Password?</p>
    </form>
  );
}
