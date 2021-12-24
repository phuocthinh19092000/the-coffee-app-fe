import React from 'react';
import './PopUpLogOut.scss';
import Card from '../Card/Index';
import Button from '../Button/Index';
import { useAppDispatch } from '../../storage/hooks';
import { logout } from '../../features/auth/actions/login';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PopUpLogOut = (props: Props) => {
  const dispatch = useAppDispatch();
  
  const LogOutHandler = () => {
    dispatch(logout())
    localStorage.clear()
  };

  return (
    <Card className="card card--right card__content">
      <span id="span-log-out"> Are you sure you want to log out ?</span>
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
