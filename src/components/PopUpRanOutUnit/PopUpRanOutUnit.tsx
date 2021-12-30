import React from 'react';
import './PopUpRanOutUnit.scss';
import Card from '../Card/Index';
import Button from '../Button/Index';
import Exit from '../../share/assets/vector/Exit.svg';

type Props = {
  onClickContinueProceed?: React.MouseEventHandler<HTMLButtonElement>;
  handleClickBackForm: React.MouseEventHandler<HTMLButtonElement>;
  onClickExit?: React.MouseEventHandler<HTMLElement>;
};

const PopUpRanOutUnit = (props: Props) => {
  return (
    <div className="card-ran-out-unit--blur">
      <Card className="card card--center card-ran-out-unit">
        <img src={Exit} className="card-ran-out-unit__exit" onClick={props.onClickExit} alt="Exit" />
        <div className="card-ran-out-unit__content">
          <p className="card-ran-out-unit__title">You ran out of free units</p>
          <p className="card-ran-out-unit__message">
            Are you sure you want to proceed this order?
            <br />
            Excceeding orders will be sent to you by month-end.
          </p>
        </div>
        <Button
          onClick={props.onClickContinueProceed}
          className="btn btn-primary btn--enabled card-ran-out-unit__btn-first"
          type="submit"
          titleButton="YES, I WANT TO PROCEED"
        />
        <Button
          onClick={props.handleClickBackForm}
          className="btn btn-primary btn-secondary card-ran-out-unit__btn-secondary "
          type="submit"
          titleButton="NO, I CHANGE MY MIND"
        />
      </Card>
    </div>
  );
};

export default PopUpRanOutUnit;
