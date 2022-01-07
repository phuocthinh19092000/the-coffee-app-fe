import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './HookForm.scss';
import { useAppDispatch } from '../../storage/hooks';
import { login } from '../../features/auth/actions/login';
import { useState } from 'react';
import UserIcon from '../../share/assets/vector/User.svg';
import EyeIcon from '../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../share/assets/img/close-eye.png';
import { getUserData } from '../../features/auth/actions/getUserInfo';
import { getDeviceToken } from '../../services/firebase';

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
    reset,
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
  const [loginFailed, setLoginFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const deviceToken = await getDeviceToken();
    const accessToken = await dispatch(
      login({ username: data.username, password: data.password, deviceToken: deviceToken }),
    );
    if (accessToken.meta.requestStatus === 'fulfilled') {
      setLoginFailed(false);
      dispatch(getUserData());
    } else {
      setLoginFailed(true);
      reset({ username: '', password: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field">
        <input {...register('username')} placeholder="Usename" />
        <img src={UserIcon} alt="User Icon" />
      </div>
      {errors.username && <p className="error">{errors.username?.message}</p>}

      <div className="input-field">
        <input type={showPassword ? 'text' : 'password'} {...register('password')} placeholder="Password" />
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
      <p className="forget-password">Forget Password?</p>
    </form>
  );
}
