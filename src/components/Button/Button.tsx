//import { Button } from 'react-bootstrap';
import './Button.scss';
type Props = {
  className: string;
  titleButton: string;
};
const Button = (props: Props) => {
  return <button className={props.className}>{props.titleButton}</button>;
};
export default Button;
