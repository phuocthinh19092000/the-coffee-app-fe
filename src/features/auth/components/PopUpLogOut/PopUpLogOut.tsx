import React from 'react';
import './PopUpLogOut.css';
import Card from '../../../../components/Card/Index';
import Button from '../../../../components/Button/Index';
import { useAppDispatch } from '../../../../storage/hooks';
import { logout } from '../../actions/auth';
import { getDeviceToken } from '../../../../services/firebase';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PopUpLogOut = (props: Props) => {
  const dispatch = useAppDispatch();

  const LogOutHandler = async () => {
    const deviceToken = await getDeviceToken();
    dispatch(logout({ deviceToken }));
  };

  return (
    <Card className="card card--right card__content">
        <span className="span-log-out"> Are you sure you want to log out ?</span>
        <Button
            onClick={LogOutHandler}
            className="btn btn-primary btn--enabled btn-logout"
            type="submit"
            titleButton="LOGOUT"
        />
      <Button
        onClick={props.onClick}
        className="btn btn-primary btn-secondary btn-logout"
        type="submit"
        titleButton="CANCEL"
      />
    </Card>
  );
};

export default PopUpLogOut;
