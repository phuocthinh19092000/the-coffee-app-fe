import React from 'react';
import './Icon.css';

type Props = {
  source: string;
  href: string;
  className: string;
};

const Icon = (props: Props) => {
  return (
    <div className={props.className}>
      <a href={props.href} target="_blank">
        <img src={props.source} />
      </a>
    </div>
  );
};

export default Icon;
