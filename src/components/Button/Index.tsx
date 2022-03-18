import './styles.css';
import React from 'react';
type Props = {
  titleButton: string;
  className?: string;
  type?: string | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled?: boolean | false;
};

const Button = (props: Props) => {
  return (
    <button disabled={props.isDisabled} className={`btn ${props.className}`} onClick={props.onClick} type="submit">
      {props.titleButton}
    </button>
  );
};
export default Button;
