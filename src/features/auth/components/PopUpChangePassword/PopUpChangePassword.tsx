import Card from '../../../../components/Card/Index';
import EyeIcon from '../../../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../../../share/assets/img/close-eye.png';
import Button from '../../../../components/Button/Index';
import React, { useState } from 'react';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePassword } from '../../actions/managePassword';
import { useAppDispatch } from '../../../../storage/hooks';
import { NotificationParams } from '../../../../interfaces';
import { NotificationType, PositionToast } from '../../../../enum';
import Input from '../../../../components/Input/Input';
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
    mode: 'onChange',
    defaultValues: { currentPassword: '', newPassword: '', reEnterPassword: '' },
  });

  const { handleSubmit, formState, setError, control } = methods;
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
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className="card card--right">
        <p className="text-style-1440-h1 text-brown text-center py-[100px] ">Change Password</p>
        <div className="space-y-1 mb-[200px]">
          <Controller
            name="currentPassword"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Current Password"
                type={isShowCurrentPassword ? 'text' : 'password'}
                onChange={(event) => onChange(event.target.value)}
                value={value}
                src={isShowCurrentPassword ? CloseEyeIcon : EyeIcon}
                onClickFirstIcon={() => setIsShowCurrentPassword(!isShowCurrentPassword)}
                error={errors.currentPassword}
                className="block-input--white"
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="New Password"
                type={isShowNewPassword ? 'text' : 'password'}
                onChange={(event) => onChange(event.target.value)}
                value={value}
                src={isShowNewPassword ? CloseEyeIcon : EyeIcon}
                onClickFirstIcon={() => setIsShowNewPassword(!isShowNewPassword)}
                error={errors.newPassword}
                className="block-input--white"
              />
            )}
          />
          <Controller
            name="reEnterPassword"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                placeholder="Re-enter New Password"
                type={isShowReEnterPassword ? 'text' : 'password'}
                onChange={(event) => onChange(event.target.value)}
                value={value}
                src={isShowReEnterPassword ? CloseEyeIcon : EyeIcon}
                onClickFirstIcon={() => setIsShowReEnterPassword(!isShowReEnterPassword)}
                error={errors.reEnterPassword}
                className="block-input--white"
              />
            )}
          />
        </div>
        <Button
          type="submit"
          isDisabled={!isValid}
          className={`btn btn-primary ${isValid ? 'btn--enabled' : 'btn--disabled'}`}
          titleButton="CHANGE PASSWORD"
        />
      </Card>
    </form>
  );
};

export default PopUpChangePassword;
