import React from 'react';
import './Input.scss';

type Props = {
  src?: string;
  placeholder?: string;
  className?: string;
  type?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  value?: string;
};
const Input = (props: Props) => {
  return (
    <div id="input-container" className={props.className}>
      <input
        placeholder={props.placeholder}
        type={props.type}
        onChange={props.onChange}
        onFocus={props.onFocus}
        value={props.value}
      />
      <img src={props.src} alt={props.src} className="icon-input" />
    </div>
  );
};
export default Input;
