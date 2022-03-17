import StaffImg from '../../../../share/assets/img/LoginStaff.png';
import Icon from '../../../../components/Icon/Icon';
import FacebookIcon from '../../../../share/assets/vector/VectorFacebook.svg';
import EyeIcon from '../../../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../../../share/assets/img/close-eye.png';
import InstaIcon from '../../../../share/assets/vector/VectorInsta.svg';
import LinkedinIcon from '../../../../share/assets/vector/VectorLinkedin.svg';
import { useSelector } from 'react-redux';
import { checkRole, login, selectLoginState, selectUserState } from '../../../auth/actions/auth';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { NotificationType, ROLE } from '../../../../enum';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormLogin, schemaFormLogin } from '../../../../interfaces';
import CustomInput from '../../../../components/CustomInput/CustomInput';
import { InputParams } from '../../../../interfaces';
import { useAppDispatch } from '../../../../storage/hooks';
import useClearNotification from '../../../../utils/useClearNotification';
import ToastNotification from '../../../../components/ToastNotification/ToatstNotification';
import ButtonStaff from '../../../../components/ButtonStaff/ButtonStaff';

const LoginStaff = () => {
  const user = useSelector(selectUserState);
  const accessToken = useSelector(selectLoginState);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [typeShowNotification, setTypeShowNotification] = useClearNotification();
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<FormLogin>({
    resolver: yupResolver(schemaFormLogin),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  useEffect(() => {
    if (accessToken && user.role === ROLE.VENDOR) {
      history.push('/staff');
    }
    if (accessToken && user.role === ROLE.ADMIN) {
      history.push('/admin');
    }
  }, []);

  const onSubmitForm = async (dataFrom: FormLogin) => {
    const responeLogin = await dispatch(login({ email: dataFrom.email, password: dataFrom.password }));
    dispatch(checkRole([ROLE.VENDOR, ROLE.ADMIN]));

    if (login.fulfilled.match(responeLogin)) {
      switch (responeLogin.payload.userInfor.role) {
        case ROLE.VENDOR:
          history.push('/staff');
          break;
        case ROLE.ADMIN:
          history.push('/admin');
          break;
      }
    } else {
      setTypeShowNotification({
        type: NotificationType.FAILURE,
        message: 'Email or password incorrect',
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] ">
      <div className="flex flex-[1.5] flex-col items-center rounded-2xl bg-white pt-[41px] pb-[80px] px-[28px] mt-[120px] w-1/3 ">
        <img src={StaffImg} alt="Login Staff" className="mb-4" />
        <div className="w-full flex flex-col">
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <Controller
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  placeholder="Email"
                  name="email"
                  onChange={(inputParam: InputParams) => onChange(inputParam.event?.target.value)}
                  value={value}
                  error={errors.email}
                  className="mb-1.5"
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomInput
                  placeholder="Password"
                  name="password"
                  type={isShowPassword ? 'text' : 'password'}
                  onChange={(inputParam: InputParams) => onChange(inputParam.event?.target.value)}
                  value={value}
                  icon={isShowPassword ? CloseEyeIcon : EyeIcon}
                  onClickIcon={() => setIsShowPassword(!isShowPassword)}
                  error={errors.password}
                  className="mb-2"
                />
              )}
            />
            <ButtonStaff className="btn-staff--primary" titleButton="Login" />
          </form>
        </div>
      </div>
      <div className="flex flex-col flex-1 justify-end items-center mb-[30px]">
        <div className="brand-media">
          <Icon href="https://www.facebook.com/OneTechStopVietnam/" src={FacebookIcon} className="icon" />
          <Icon href="https://www.instagram.com/OneTechStopVietnam/" src={InstaIcon} className="icon" />
          <Icon href="https://www.linkedin.com/OneTechStopVietnam/" src={LinkedinIcon} className="icon" />
        </div>
        <div className="card__content">
          <p className="login-staff ">ONE TECH STOP VIET NAM</p>
        </div>
      </div>

      {typeShowNotification.message && (
        <ToastNotification
          type={typeShowNotification.type}
          message={typeShowNotification.message}
          position={typeShowNotification.position}
        />
      )}
    </div>
  );
};
export default LoginStaff;
