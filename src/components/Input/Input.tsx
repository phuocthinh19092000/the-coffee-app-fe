import React from 'react';
import { FieldError } from 'react-hook-form';
import './Input.css';

type Props = {
  src?: string;
  src2?: string | undefined;
  placeholder?: string;
  className?: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onClickFirstIcon?: React.MouseEventHandler<HTMLImageElement>;
  onClickSecondIcon?: React.MouseEventHandler<HTMLImageElement>;
  value?: string | number;
  readOnly?: boolean | false;
  error?: FieldError;
};
const Input = (props: Props) => {
  return (
    <>
      <div className={`block-input ${props.className} `}>
        <input
          placeholder={props.placeholder}
          type={props.type}
          onChange={props.onChange}
          readOnly={props.readOnly}
          onFocus={props.onFocus}
          value={props.value}
        />
        {props.src && <img src={props.src} alt="icon-input-1" className="right-1.5" onClick={props.onClickFirstIcon} />}
        {props.src2 && (
          <img src={props.src2} alt="icon-input-2" className="right-[74px]" onClick={props.onClickSecondIcon} />
        )}
      </div>
      {props.error && <p className="text-error ml-[20px] my-[10px]">{props.error.message}</p>}
    </>
  );
};
export default Input;
