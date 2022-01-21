import React from 'react';
import './LeftSideBarItem.scss';
type Props = {
  onClick: React.MouseEventHandler<HTMLElement>;
  src?: string;
  alt?: string;
  title?: string;
};
const LeftSideBarItem = (props: Props) => {
  return (
    <div className="left-side-bar-item" onClick={props.onClick}>
      <img src={props.src} alt={props.alt} className="left-side-bar-item__img" />
      <span>{props.title}</span>
    </div>
  );
};
export default LeftSideBarItem;
