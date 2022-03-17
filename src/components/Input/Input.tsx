import React from 'react';
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
};
const Input = (props: Props) => {
  return (
    <div className={`${props?.className} block-input`}>
      <input
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        readOnly={props.readOnly}
        onFocus={props.onFocus}
        value={props.value}
      />
      {props.src && <img src={props.src} alt={props.src} className="right-1.5" onClick={props.onClickFirstIcon} />}
      {props.src2 && (
        <img src={props.src2} alt={props.src2} className="right-[74px]" onClick={props.onClickSecondIcon} />
      )}
    </div>
  );
};
export default Input;
