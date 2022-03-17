import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch } from '../../storage/hooks';
import { addDeviceToken, checkRole, login, setDeviceToken } from '../../features/auth/actions/auth';
import { useState } from 'react';
import UserIcon from '../../share/assets/vector/User.svg';
import EyeIcon from '../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../share/assets/img/close-eye.png';
import { getDeviceToken } from '../../services/firebase';
import { useHistory } from 'react-router';
import { ROLE } from '../../enum';
import FormInput from '../FormInput/FormInput';
import Button from '../Button/Index';
import { customerAccessRole } from '../../constant';
import { FormLogin, schemaFormLogin } from '../../interfaces';

const HookForm = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const methods = useForm<FormLogin>({
    resolver: yupResolver(schemaFormLogin),
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
  });
  const {
    setError,
    formState: { errors, isValid },
    handleSubmit,
  } = methods;
  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = async (dataForm: FormLogin) => {
    const responeLogin = await dispatch(login({ email: dataForm.email, password: dataForm.password }));

    dispatch(checkRole([ROLE.CUSTOMER, ROLE.ADMIN]));

    if (login.fulfilled.match(responeLogin) && customerAccessRole.includes(responeLogin.payload.userInfor.role)) {
      const deviceToken = await getDeviceToken();
      if (deviceToken) {
        await dispatch(addDeviceToken({ deviceToken: deviceToken }));
        dispatch(setDeviceToken(deviceToken));
      }
    } else {
      setError('password', {
        message: 'Email or password incorrect',
      });
    }
  };
  const moveToLoginStaff = () => {
    history.push(`/login`);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput name="email" className="mb-1.25" placeholder="Email" src={UserIcon} error={errors.email} />
        <FormInput
          name="password"
          className="mb-1.25"
          placeholder="Password"
          type={isShowPassword ? 'text' : 'password'}
          onClickFirstIcon={() => setIsShowPassword(!isShowPassword)}
          src={isShowPassword ? CloseEyeIcon : EyeIcon}
          error={errors.password}
        />
        <Button
          type="submit"
          isDisabled={!isValid}
          className={`btn btn-primary ${isValid ? 'btn--enabled' : 'btn--disabled'}`}
          titleButton="LOGIN"
        />
        <p className="text-error text-2.5 text-right mt-3 cursor-pointer" onClick={moveToLoginStaff}>
          You are Staff?
        </p>
      </form>
    </FormProvider>
  );
};

export default HookForm;
