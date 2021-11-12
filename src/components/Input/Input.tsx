import React from 'react';
import './Input.scss';

type Props = {
  src?: string;
  src2?: string | undefined;
  placeholder?: string;
  className?: string;
  type?: string;
};
const Input = (props: Props) => {
  return (
    <div id="input-container" className={props.className}>
      <input placeholder={props.placeholder} type={props.type} />
      <img src={props.src} alt={props.src} className="icon-input" />
      {props.src2 && <img src={props.src2} alt={props.src2} className="icon-input" />}
    </div>
  );
};
export default Input;
