import React, { ReactChild } from 'react';
import Exit from '../../share/assets/vector/Exit.svg';
import './WrapperForm.scss';
import Card from '../Card/Index';

type Props = {
  name: string;
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
  onClickExit?: React.MouseEventHandler<HTMLImageElement>;
  onClickCancel?: React.MouseEventHandler<HTMLButtonElement>;
  onClickBrowseAgain: React.MouseEventHandler<HTMLElement>;
  onClickSave?: React.MouseEventHandler<HTMLButtonElement>;
  isHavePreviewFile: boolean;
  isFullFill: boolean;
};
const WrapperForm = (props: Props) => {
  return (
    <Card className="card--new-center">
      <div className="form-add-item">
        <div className="form-add-item__header">
          <p>{props?.name}</p>
          <img className="form-add-item__btn-exit" src={Exit} alt="Exit Icon" onClick={props.onClickExit} />
        </div>
        <div className="form-add-item__body">{props.children}</div>
        <div className="form-add-item__footer">
          <button className="form-add-item__btn" onClick={props.onClickBrowseAgain}>
            <p className={props.isHavePreviewFile ? 'form-add-item__btn-title' : 'hidden'}>Browse Again</p>
          </button>
          <div className="flex">
            <button className="form-add-item__btn" onClick={props.onClickCancel}>
              <p className="form-add-item__btn-title">Cancel</p>
            </button>
            <button
              className={props.isFullFill ? 'form-add-item__btn-save' : 'form-add-item__btn-save--disabled'}
              onClick={props.onClickSave}
            >
              <p className="form-add-item__btn-title">Save</p>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default WrapperForm;
