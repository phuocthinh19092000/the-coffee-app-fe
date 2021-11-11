import React from 'react';
import './PopUpLogOut.scss';
import Card from '../Card/Index';
import Button from '../Button/Index';
import { useState } from 'react';
const PopUpLogOut = () => {
  const [show, setShow] = useState(true);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <React.Fragment>
      {show && (
        <Card className="card right content-center">
          <span id="span-log-out"> Are you sure you want to log out ?</span>

          <Button className="button primary enabled logout" type="submit" titleButton="LOGOUT" />
          <Button
            onClick={handleClick}
            className="button primary secondary logout"
            type="submit"
            titleButton="CANCEL"
          />
        </Card>
      )}
    </React.Fragment>
  );
};

export default PopUpLogOut;
