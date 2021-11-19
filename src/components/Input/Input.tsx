import React from 'react';
import './Input.scss';

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
};
const Input = (props: Props) => {
  return (
    <div className={`${props?.className} block-input`}>
      <input
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        onFocus={props.onFocus}
        value={props.value}
      />
      <img src={props.src} alt={props.src} className="icon-input" onClick={props.onClickFirstIcon} />
      {props.src2 && <img src={props.src2} alt={props.src2} className="icon-input" onClick={props.onClickSecondIcon} />}
    </div>
  );
};
export default Input;
