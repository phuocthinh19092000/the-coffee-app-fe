import Card from '../../../../components/Card/Index';
import EyeIcon from '../../../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../../../share/assets/img/close-eye.png';
import Button from '../../../../components/Button/Index';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm, FormProvider } from 'react-hook-form';
import FormInput from '../../../../components/FormInput/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePassword } from '../../actions/managePassword';
import { useAppDispatch } from '../../../../storage/hooks';
import { NotificationParams } from '../../../../interfaces';
import { NotificationType, PositionToast } from '../../../../enum';
interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  reEnterPassword: string;
}

const MIN_CHARACTER_PASSWORD_REQUIRED = 8;

const schemaFormChangePassword = yup.object().shape({
  currentPassword: yup
    .string()
    .required('Current password is required')
    .min(MIN_CHARACTER_PASSWORD_REQUIRED, 'Current password must be at least 8 characters'),
  newPassword: yup
    .string()
    .required('New password is required')
    .min(MIN_CHARACTER_PASSWORD_REQUIRED, 'New password must be at least 8 characters')
    .notOneOf([yup.ref('currentPassword')], 'New password and current password must be different'),
  reEnterPassword: yup
    .string()
    .required('Re-enter password is required')
    .min(MIN_CHARACTER_PASSWORD_REQUIRED, 'Re-enter password must be at least 8 characters')
    .oneOf([yup.ref('newPassword')], 'Password does not match'),
});

type Props = {
  setShowNotification: React.Dispatch<React.SetStateAction<NotificationParams>>;
  onClickClosePopUp: () => void;
};

const PopUpChangePassword = (props: Props) => {
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowReEnterPassword, setIsShowReEnterPassword] = useState(false);
  const dispatch = useAppDispatch();

  const methods = useForm<ChangePasswordDto>({
    resolver: yupResolver(schemaFormChangePassword),
    mode: 'onTouched',
  });

  const { handleSubmit, formState, setError, setFocus } = methods;
  const { errors, isValid } = formState;

  const onSubmit = async (dataForm: ChangePasswordDto) => {
    const { reEnterPassword, ...changePassWordParams } = dataForm;
    const responseApi = await dispatch(changePassword(changePassWordParams));

    if (changePassword.fulfilled.match(responseApi)) {
      props.onClickClosePopUp();
      props.setShowNotification({
        message: 'Password changed successfully!',
        type: NotificationType.SUCCESS,
        position: PositionToast.TOP_RIGHT,
      });
    } else {
      setError('currentPassword', {
        message: 'Wrong password. Please try again',
      });
      setFocus('currentPassword');
    }
  };

  return (
    <Card className="card card--right">
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p className="text-style-1440-h1 text-brown pt-[120px] py-[100px] text-center">Change Password</p>
          <FormInput
            name="currentPassword"
            type={isShowCurrentPassword ? 'text' : 'password'}
            onClickFirstIcon={() => setIsShowCurrentPassword(!isShowCurrentPassword)}
            className="mb-1"
            placeholder="Current Password"
            src={isShowCurrentPassword ? CloseEyeIcon : EyeIcon}
            error={errors.currentPassword}
          />
          <FormInput
            name="newPassword"
            type={isShowNewPassword ? 'text' : 'password'}
            onClickFirstIcon={() => setIsShowNewPassword(!isShowNewPassword)}
            className="mb-1.5"
            placeholder="New Password"
            src={isShowNewPassword ? CloseEyeIcon : EyeIcon}
            error={errors.newPassword}
          />
          <FormInput
            name="reEnterPassword"
            type={isShowReEnterPassword ? 'text' : 'password'}
            onClickFirstIcon={() => setIsShowReEnterPassword(!isShowReEnterPassword)}
            className="mb-[200px]"
            placeholder="Re-enter New Password"
            src={isShowReEnterPassword ? CloseEyeIcon : EyeIcon}
            error={errors.reEnterPassword}
          />
          <Button
            type="submit"
            isDisabled={!isValid}
            className={`btn btn-primary ${isValid ? 'btn--enabled' : 'btn--disabled'}`}
            titleButton="CHANGE PASSWORD"
          />
        </form>
      </FormProvider>
    </Card>
  );
};

export default PopUpChangePassword;
