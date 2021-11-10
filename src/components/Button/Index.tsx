//import { Button } from 'react-bootstrap';
import './styles.scss';
type Props = {
  className: string;
  titleButton: string;
  type?: string | 'submit';
};
const Button = (props: Props) => {
  return (
    <button className={props.className} type="submit">
      {props.titleButton}
    </button>
  );
};
export default Button;
