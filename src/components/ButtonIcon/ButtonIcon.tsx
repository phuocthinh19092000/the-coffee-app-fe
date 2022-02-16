import './ButtonIcon.scss';

import React from 'react';

type Props = {
  src: string;
  onClickIcon?: React.MouseEventHandler<HTMLElement>;
  className?: string;
};
const ButtonIcon = (props: Props) => {
  return (
    <div onClick={props.onClickIcon} className={`button-icon ${props.className}`}>
      <img alt="icon" src={props.src} />
    </div>
  );
};

export default ButtonIcon;
