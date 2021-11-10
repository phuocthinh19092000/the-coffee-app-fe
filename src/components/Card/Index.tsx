// import { Form as form } from 'react-bootstrap';
import { ReactChild } from 'react';
import './styles.scss';
type Props = {
  className: string;
  children?: React.ReactChild[] | ReactChild | JSX.Element | JSX.Element[];
};
const Card = (props: Props) => {
  return <div className={props.className}>{props.children}</div>;
};
export default Card;
