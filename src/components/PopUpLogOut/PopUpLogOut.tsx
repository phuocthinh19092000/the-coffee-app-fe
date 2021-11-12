import React from 'react';
import './PopUpLogOut.scss';
import Card from '../Card/Index';
import Button from '../Button/Index';
import { useState } from 'react';

type Props = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const PopUpLogOut = (props: Props) => {
  const LogOutHandler = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Card className="card right content-center">
      <span id="span-log-out"> Are you sure you want to log out ?</span>

      <Button onClick={LogOutHandler} className="button primary enabled logout" type="submit" titleButton="LOGOUT" />
      <Button onClick={props.onClick} className="button primary secondary logout" type="submit" titleButton="CANCEL" />
    </Card>
  );
};

export default PopUpLogOut;
