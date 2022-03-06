import './styles.scss';
import React from 'react';
type Props = {
  className: string;
  titleButton: string;
  type?: string | 'submit';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  isDisabled?: boolean | false;
};

const Button = (props: Props) => {
  return (
    <button disabled={props.isDisabled} className={props.className} onClick={props.onClick} type="submit">
      {props.titleButton}
    </button>
  );
};
export default Button;
