import React from 'react';
import './Input.scss';

type Props = {
  src?: string;
  placeholder?: string;
  className?: string;
  type?: string;
};
const Input = (props: Props) => {
  return (
    <div id="input-container" className={props.className}>
      <input placeholder={props.placeholder} type={props.type} />
      <img src={props.src} alt={props.src} className="icon-input" />
    </div>
  );
};
export default Input;
