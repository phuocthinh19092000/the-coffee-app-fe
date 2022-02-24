import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './FormLoginStaff.scss';
import { useAppDispatch } from '../../../../storage/hooks';
import { checkRole, login } from '../../../auth/actions/auth';
import { useEffect, useState } from 'react';
import EyeIcon from '../../../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../../../share/assets/img/close-eye.png';
import { NotificationType, PositionToast, ROLE } from '../../../../enum';
import ToastNotification from '../../../../components/ToastNotification/ToatstNotification';
import { useHistory } from 'react-router-dom';

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
      email: '',
      password: '',
    },
  });

  const [loginFailed, setLoginFailed] = useState(false);
  const timeOutToast = 3000;
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const goStaffDashboard = () => {
    let path = `/staff`;
    history.push(path);
  };
  const goAdminDashboard = () => {
    let path = `/admin`;
    history.push(path);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const accessToken = await dispatch(login({ email: data.email, password: data.password }));
    dispatch(checkRole([ROLE.VENDOR, ROLE.ADMIN]));
    if (accessToken.payload && accessToken.payload.userInfor.role === ROLE.VENDOR) {
      setLoginFailed(false);
      goStaffDashboard();
    } else if (accessToken.payload && accessToken.payload.userInfor.role === ROLE.ADMIN) {
      setLoginFailed(false);
      goAdminDashboard();
    } else {
      setLoginFailed(true);
      reset({ email: '', password: '' });
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
        <input {...register('email')} placeholder="Email" className="staff-input" />
      </div>
      {errors.email && <p className="error">{errors.email?.message}</p>}

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
          className="cursor-pointer absolute right-1 top-1"
          alt="Icon Password"
        />
      </div>
      {errors.password && <p className="error-staff">{errors.password?.message}</p>}

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
