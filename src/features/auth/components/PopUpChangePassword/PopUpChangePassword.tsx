import Card from '../../../../components/Card/Index';
import EyeIcon from '../../../../share/assets/vector/Eye.svg';
import CloseEyeIcon from '../../../../share/assets/img/close-eye.png';
import Button from '../../../../components/Button/Index';
import React, { useState } from 'react';
import FormInput from '../../../../components/FormInput/FormInput';

const PopUpChangePassword = () => {
  const [isShowCurrentPassword, setIsShowCurrentPassword] = useState(false);
  const [isShowNewPassword, setIsShowNewPassword] = useState(false);
  const [isShowReEnterPassword, setIsShowReEnterPassword] = useState(false);

  return (
    <Card className="card card--right">
      <p className="text-style-1440-h1 text-brown pt-[120px] py-[100px] text-center">Change Password</p>
      <FormInput
        name="currentPassword"
        type={isShowCurrentPassword ? 'text' : 'password'}
        onClickFirstIcon={() => setIsShowCurrentPassword(!isShowCurrentPassword)}
        className="mb-1"
        placeholder="Current Password"
        src={isShowCurrentPassword ? CloseEyeIcon : EyeIcon}
      />
      <FormInput
        name="newPassword"
        type={isShowNewPassword ? 'text' : 'password'}
        onClickFirstIcon={() => setIsShowNewPassword(!isShowNewPassword)}
        className="mb-1.5"
        placeholder="New Password"
        src={isShowNewPassword ? CloseEyeIcon : EyeIcon}
      />
      <FormInput
        name="reEnterPassword"
        type={isShowReEnterPassword ? 'text' : 'password'}
        onClickFirstIcon={() => setIsShowReEnterPassword(!isShowReEnterPassword)}
        className="mb-[200px]"
        placeholder="Re-enter New Password"
        src={isShowReEnterPassword ? CloseEyeIcon : EyeIcon}
      />
      <Button type="submit" className={`btn btn-primary btn--enabled`} titleButton="CHANGE PASSWORD" />
    </Card>
  );
};

export default PopUpChangePassword;
