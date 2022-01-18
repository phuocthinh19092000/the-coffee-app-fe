import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormLoginStaff.scss';
import { useAppDispatch } from '../../../../storage/hooks';
import { login } from '../../../auth/actions/auth';
import { useEffect, useState } from 'react';
import EyeIcon from '../../../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../../../share/assets/img/close-eye.png';
import { getDeviceToken } from '../../../../services/firebase';
import { NotificationType } from '../../../../enum/NotificationType';
import ToastNotification from '../../../../components/ToastNotification/ToatstNotification';
import { PositionToast } from '../../../../enum/PositionToast';

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

export default function FormLoginStaff() {
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
  const timeOutToast = 3000;
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
    } else {
      setLoginFailed(true);
      reset({ username: '', password: '' });
    }
  };

  useEffect(() => {
    if (loginFailed) {
      const timer = setTimeout(() => {
        setLoginFailed(false);
      }, timeOutToast);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [loginFailed]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-field-staff">
        <input {...register('username')} placeholder="Username" className="staff-input" />
      </div>
      {errors.username && <p className="error">{errors.username?.message}</p>}

      <div className="input-field-staff">
        <input
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          placeholder="Password"
          className="staff-input"
        />
        <img
          src={showPassword ? CloseEyeIcon : EyeIcon}
          onClick={toggleShowPassword}
          className="cursor-pointer absolute right-4 top-3"
          alt="Icon Password"
        />
      </div>
      {errors.password && <p className="error">{errors.password?.message}</p>}

      {loginFailed && (
        <ToastNotification
          type={NotificationType.FAILURE}
          message="Username or password incorrect"
          position={PositionToast.TOP_CENTER}
        />
      )}
      <button className="staff-login-btn" type="submit">
        LOGIN
      </button>
    </form>
  );
}